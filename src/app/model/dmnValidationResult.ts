export class IDmnValidationResult {

    public constructor(
        public tableId: string,
        public ruleId: string,
        public message: string,
        public severity: string,
    ) {}
}
