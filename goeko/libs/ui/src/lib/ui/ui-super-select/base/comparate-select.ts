/** Funtion to compare element of  select  */
export const defaultSet = (o1: any, o2: any) => {
/* 	if (o1 && o1.value) {
		return o1.value === o2;
	} */
	if (o1 && o1.value) {
		return o1.value === o2.value;
	}
	if (o1 && o2) {
		return o1 === o2;
	}
	return null;
};
