"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDto = void 0;
class PostDto {
    constructor(model) {
        this.user = model.user;
        this.text = model.text;
        this.time = model.time;
        this.file = model.file;
        this.likes = model.likes;
        this.comments = model.comments;
    }
}
exports.PostDto = PostDto;
//# sourceMappingURL=post-dto.js.map