// that `| undefined` is grinding my gears but im handling this in the code itself
export type ReturnWithDoc = (data: object, doc: string | undefined) => Promise<void>;

export type ReturnWithoutDoc = (data: object) => Promise<void>;
