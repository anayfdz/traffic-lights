export declare class UseCaseProxy<T> {
    private readonly useCase;
    constructor(useCase: T);
    getInstance(): T;
}
