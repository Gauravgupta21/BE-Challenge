import { ValidationError } from "class-validator";
class ValidateException extends Error {
  status!: number;
  message!: string;
  constructor(errors: any) {
    super("400");

    this.status = 400;
    (errors: ValidationError[]) => {
      if (errors.length > 0) {
        console.log("-------------------------");
        this.message = errors
          .map((error: ValidationError) => {
            const constraints = error.constraints as {
              [type: string]: string;
            };
            return Object.values(constraints);
          })
          .join(", ");
      }
    };
  }
}

export default ValidateException;
