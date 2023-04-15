export const generateOptions = ({ list, label, value }) => {
  return list.map((option) => ({
    label: option[label],
    value: option[value]
  }));
};
