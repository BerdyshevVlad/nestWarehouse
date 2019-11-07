"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["CLIENT"] = "user";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
class UserEntity extends mongoose_1.Document {
}
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map