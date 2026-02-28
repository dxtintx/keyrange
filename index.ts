type modes = "fromStart" | "fromEnd";

export class KeyRange {
    private mode: modes = "fromStart";
    private cutOutOfPattern: boolean = false;

    private array: any[] = [];
    private pattern: string = "";

    constructor(array: any[], pattern: string) {
        this.array = array;
        this.pattern = pattern;
    }

    /**
     * @default "fromStart"
     * @param {modes} mode - the mode to use
     */
    setMode(mode: modes) {
        this.mode = mode;
        return this;
    }

    /**
     * @default false
     * @param {boolean} cutOutOfPattern - if true, the elements that are not in the pattern will be cut out
     */
    setCutOutOfPattern(cutOutOfPattern: boolean) {
        this.cutOutOfPattern = cutOutOfPattern;
        return this;
    }

    private verifyRange(array: any[], pattern: string): boolean {
        const patternArray = pattern.split("");
        let checksum = 0;

        for (let i = 0; i < patternArray.length; i++) {
            if (patternArray[i] === "-") {
                checksum += 1;
            } else {
                const num = parseInt(patternArray[i], 10);
                if (isNaN(num)) {
                    throw new Error("Pattern must have only numbers or '-' characters.");
                }
                checksum += num;
            }
        }

        if (checksum > array.length) throw new Error("Pattern is out of range.");

        return true;
    }

    /**
     * Apply pattern on array with settings
     * @returns Array
     */
    public makeRange() {
        if (!this.verifyRange(this.array, this.pattern)) return [];

        let result: any[] = [];
        let currentIndex = 0;

        const processArray = this.mode === "fromEnd" ? [...this.array].reverse() : [...this.array];
        const processPattern = this.pattern.split("");

        for (const char of processPattern) {
            if (char === "-") {
                currentIndex++;
            } else {
                const count = parseInt(char, 10);
                for (let i = 0; i < count; i++) {
                    if (currentIndex < processArray.length) {
                        result.push(processArray[currentIndex]);
                        currentIndex++;
                    }
                }
            }
        }

        if (!this.cutOutOfPattern && currentIndex < processArray.length) {
            result.push(...processArray.slice(currentIndex));
        }
        return this.mode === "fromEnd" ? result.reverse() : result;
    }
}