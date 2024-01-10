import {parsePhoneNumberFromString} from 'libphonenumber-js/core';
import metadata from './metadata.custom.json';

export const phoneNumberDropHyphen = (value: any) => {
  const phoneNumber = parsePhoneNumberFromString(value, 'JP', metadata as any);
  if (!phoneNumber) return {value, valid: false};
  if (!phoneNumber.isValid()) return {value, valid: false};
  return {value: phoneNumber.formatNational().replace(/\s+/g, '').replace(/-/g, ''), valid: true};
};

export const phoneNumberAddHyphen = (telno: any) => {
  if (!telno) return telno;
  const phoneNumber = parsePhoneNumberFromString(telno, 'JP', metadata as any);
  if (!phoneNumber) return telno;
  if (!phoneNumber.isValid()) return telno;
  return phoneNumber.formatNational();
};
