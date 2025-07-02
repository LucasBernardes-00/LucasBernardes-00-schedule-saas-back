import { IErrorManager } from "../../contracts/core/internal/errorManager.interface";

export class ErrorManager implements IErrorManager {
  private errors: string[];

  constructor() { 
		this.errors = []
	}

  addError(error: string) {
		this.errors.push(error)
	}

	hasErrors() {
		return this.errors.length > 0
	}

	getErrors() {
		return this.errors
	}
}