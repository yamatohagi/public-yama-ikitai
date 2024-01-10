import {z} from 'zod';

export function defaultInstance<T extends z.ZodTypeAny>(
  schema: z.AnyZodObject | z.ZodDefault<any> | z.ZodEffects<any>,
  options: object = {}
): z.infer<T> {
  // const defaultArrayEmpty = 'defaultArrayEmpty' in options ? options.defaultArrayEmpty : false;
  const defaultDateEmpty = 'defaultDateEmpty' in options ? options.defaultDateEmpty : false;
  const defaultDateUndefined = 'defaultDateUndefined' in options ? options.defaultDateUndefined : false;
  const defaultDateNull = 'defaultDateNull' in options ? options.defaultDateNull : false;

  function run(): z.infer<T> {
    if (schema instanceof z.ZodEffects) {
      if (schema.innerType() instanceof z.ZodEffects) {
        return defaultInstance(schema.innerType(), options); // recursive ZodEffect
      }
      // return schema inner shape as a fresh zodObject
      return defaultInstance(z.ZodObject.create(schema.innerType().shape), options);
    }

    if (schema instanceof z.ZodDefault) {
      const defValues = schema._def.defaultValue();
      const {shape} = schema._def.innerType._def;

      const temp = Object.entries(shape).map(([key, value]) => {
        if (defValues[key] !== undefined) {
          return [key, defValues[key]];
        }
        if (value instanceof z.ZodEffects || value instanceof z.ZodDefault) {
          return [key, defaultInstance(value as any, options)];
        }
        return [key, getDefaultValue(value as any)];
      });

      return {
        ...Object.fromEntries(temp),
        ...defValues,
      };
    }

    if (schema instanceof z.ZodType) {
      const the_shape = schema.shape as z.ZodAny; // eliminates 'undefined' issue
      const entries = Object.entries(the_shape);
      const temp = entries.map(([key, value]) => {
        const this_default = value instanceof z.ZodEffects ? defaultInstance(value, options) : getDefaultValue(value);
        return [key, this_default];
      });
      return Object.fromEntries(temp);
    }
    console.error(`Error: Unable to process this schema`);
    return null; // unknown or undefined here results in complications

    function getDefaultValue(dschema: z.ZodTypeAny): any {
      if (dschema instanceof z.ZodDefault) {
        if (!('_def' in dschema)) return undefined; // error
        if (!('defaultValue' in dschema._def)) return undefined; // error
        return dschema._def.defaultValue();
      }
      if (dschema instanceof z.ZodArray) {
        if (!('_def' in dschema)) return undefined; // error
        if (!('type' in dschema._def)) return undefined; // error
        // return empty array or array with one empty typed element
        // return defaultArrayEmpty ? [] : [getDefaultValue(dschema._def.type as z.ZodAny)];
        return [];
      }
      if (dschema instanceof z.ZodString) return '';
      if (dschema instanceof z.ZodNumber || dschema instanceof z.ZodBigInt) {
        const value = dschema.minValue ?? null;
        return value;
      }
      if (dschema instanceof z.ZodDate) {
        // eslint-disable-next-line no-nested-ternary
        const value = defaultDateEmpty ? '' : defaultDateNull ? null : defaultDateUndefined ? undefined : (dschema as z.ZodDate).minDate;
        return value;
      }
      if (dschema instanceof z.ZodSymbol) return '';
      if (dschema instanceof z.ZodBoolean) return false;
      if (dschema instanceof z.ZodNull) return null;
      if (dschema instanceof z.ZodPipeline) {
        if (!('out' in dschema._def)) return undefined; // error
        return getDefaultValue(dschema._def.out);
      }
      if (dschema instanceof z.ZodObject) {
        return defaultInstance(dschema, options);
      }
      if (dschema instanceof z.ZodAny && !('innerType' in dschema._def)) return undefined; // error?
      return getDefaultValue(dschema._def.innerType);
    }
  }
  return run();
}
