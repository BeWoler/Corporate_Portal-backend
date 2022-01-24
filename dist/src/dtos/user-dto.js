"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
class UserDto {
    constructor(model) {
        this.email = model.email;
        this.username = model.username;
        this.avatar = model.avatar;
        this.id = model._id;
        this.city = model.city;
        this.birthday = model.birthday;
        this.firstName = model.firstName;
        this.lastName = model.lastName;
        this.stack = model.stack;
        this.position = model.position;
        this.department = model.department;
        this.education = model.education;
        this.skype = model.skype;
        this.phone = model.phone;
        this.friends = model.friends;
        this.blockedUser = model.blockedUser;
        this.messagesFromFriend = model.messagesFromFriend;
        this.privatePage = model.privatePage;
        this.description = model.description;
        this.role = model.role;
    }
}
exports.UserDto = UserDto;
//# sourceMappingURL=user-dto.js.map