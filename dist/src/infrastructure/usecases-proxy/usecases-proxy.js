"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCaseProxy = void 0;
class UseCaseProxy {
    constructor(useCase) {
        this.useCase = useCase;
    }
    getInstance() {
        return this.useCase;
    }
}
exports.UseCaseProxy = UseCaseProxy;
//# sourceMappingURL=usecases-proxy.js.map