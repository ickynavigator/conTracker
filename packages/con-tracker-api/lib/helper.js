/**
 * @desc Updates an array of object values if the new value is not null
 *
 * @param {{}} obj
 * @param {{key: string, value: any}[]} keys
 */
export const updateIfNotEmpty = (obj, keys) => {
  keys.forEach(curr => {
    // eslint-disable-next-line no-param-reassign
    if (curr.value) obj[curr.key] = curr.value;
  });
};

export default {};
