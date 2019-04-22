enum COLORSType {
  RED,
  BLACK,
  WHITE,
}
export default class User {
  name: String;
  image_profile: String;
  description: String;
  age: Number;
  theme_color: COLORSType;
  react_score: Number;
  angular_score: Number;
  git_score: Number;
  birth_date: Date;
  is_married: Number;
}
