var UserModel = require("./models/user");
var {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLEnumType,
  GraphQLBoolean
} = require("graphql");

const COLORSType = new GraphQLEnumType({
  name: "COLORS",
  values: {
    RED: { value: 0 },
    BLACK: { value: 1 },
    WHITE: { value: 2 }
  }
});
// User Type
const userType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    image_profile: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    theme_color: { type: new GraphQLNonNull(COLORSType) },
    react_score: { type: new GraphQLNonNull(GraphQLInt) },
    angular_score: { type: new GraphQLNonNull(GraphQLInt) },
    git_score: { type: new GraphQLNonNull(GraphQLInt) },
    birth_date: { type: new GraphQLNonNull(GraphQLString) },
    is_married: { type: new GraphQLNonNull(GraphQLBoolean) }
  })
});

// Fields
const users_list = {
  type: new GraphQLList(userType),
  resolve: function() {
    // Here you need to figure out how mongoose work, it's not a graphql concern anymore
    const users = UserModel.find().exec();
    if (!users) throw new Error("Error");
    return users;
  }
};
const single_user = {
  type: userType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: (root, params) => {
    const user = UserModel.findById(params.id).exec();
    if (!user) throw new Error("Error");
    return user;
  }
};

const add_user = {
  type: userType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    image_profile: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString},
    age: { type: new GraphQLNonNull(GraphQLInt) },
    theme_color: { type: new GraphQLNonNull(COLORSType) },
    react_score: { type: new GraphQLNonNull(GraphQLInt) },
    angular_score: { type: new GraphQLNonNull(GraphQLInt) },
    git_score: { type: new GraphQLNonNull(GraphQLInt) },
    birth_date: { type: new GraphQLNonNull(GraphQLString) },
    is_married: { type: new GraphQLNonNull(GraphQLBoolean) }
  },
  resolve(root, params) {
    const uModel = new UserModel(params);
    const newUser = uModel.save();
    if (!newUser) throw new Error("Error");
    return newUser;
  }
};

const remove_user = {
  type: userType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve(root, params) {
    const removeduser = UserModel.findByIdAndRemove(params.id).exec();
    if (!removeduser) throw new Error("Error");
    return removeduser;
  }
};

const update_user = {
  type: userType,
  args: {
    id: { name: "id", type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    image_profile: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    theme_color: { type: new GraphQLNonNull(COLORSType) },
    react_score: { type: new GraphQLNonNull(GraphQLInt) },
    angular_score: { type: new GraphQLNonNull(GraphQLInt) },
    git_score: { type: new GraphQLNonNull(GraphQLInt) },
    birth_date: { type: new GraphQLNonNull(GraphQLString) },
    is_married: { type: new GraphQLNonNull(GraphQLBoolean) }
  },
  resolve(root, params) {
    return UserModel.findByIdAndUpdate(params.id, { $set: { name: params.name } },{ new: true }).catch(
      err => new Error(err)
    );
  }
};

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Queries_By_Me",
    fields: { users_list, single_user }
  }),

  mutation: new GraphQLObjectType({
    name: "Mutations_By_Me",
    fields: { add_user, remove_user, update_user }
  })
});
