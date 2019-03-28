var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var UserModel = require('./models/user');
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLList = require('graphql').GraphQLList;

// User Type
const userType = new GraphQLObjectType({
  name: 'user',
  fields: function () {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      },
      name: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      }
    }
  }
});


const addUser = {
  type: userType,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    }
  },
  resolve(root, params) {
    const uModel = new UserModel(params);
    const newUser = uModel.save();
    if (!newUser) {
      throw new Error('Error');
    }
    return newUser
  }
}

const removeUser = {
  type: userType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params) {
    const removeduser = UserModel.findByIdAndRemove(params.id).exec();
    if (!removeduser) {
      throw new Error('Error')
    }
    return removeduser;
  }
}

const updateUser = {
  type: userType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    }
  },
  resolve(root, params) {
    return UserModel.findByIdAndUpdate(
      params.id,
      { $set: { name: params.name } },
      { new: true }
    )
      .catch(err => new Error(err));
  }
}

exports.userSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: function () {
      return {
        users: {
          type: new GraphQLList(userType),
          resolve: function () {
            const users = UserModel.find().exec()
            if (!users) {
              throw new Error('Error')
            }
            return users
          }
        }
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {addUser, removeUser, updateUser}
  })
})

