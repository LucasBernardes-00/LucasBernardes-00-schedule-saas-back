export class StringExt {
	static isNullOrEmptyOrWhiteSpace(str: string | undefined | null): boolean {
		return str == null || str.trim() === ""
	}
}
