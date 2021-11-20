export class UserInfoDto {
  city: string;
  birthday: Date;
  firstName: string;
  lastName: string;
  stack: string;
  position: string;
  department: string;
  education: string;
  skype: string;
  phone: number;
  description: string;

  constructor(model) {
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
    this.description = model.description;
  }
}