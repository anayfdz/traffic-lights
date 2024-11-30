"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutUseCases = void 0;
class LogoutUseCases {
    constructor() { }
    async execute() {
        return ['Authentication=; HttpOnly; Path=/; Max-Age=0', 'Refresh=; HttpOnly; Path=/; Max-Age=0'];
    }
}
exports.LogoutUseCases = LogoutUseCases;
//# sourceMappingURL=logout.usecases.js.map