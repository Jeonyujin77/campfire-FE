// 목록 체크
export const onChecked = (e, items, setter) => {
  const target = e.currentTarget;
  const checked = target.checked;
  const item = target.value;

  if (checked) {
    setter([...items, item]);
  } else if (!checked) {
    setter(items.filter(el => el !== item));
  }
};
