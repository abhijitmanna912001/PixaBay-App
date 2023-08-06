import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'users',
  title: 'Users',
  type: 'document',
  fields: [
    defineField({
      name: 'displayName',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'uid',
      title: 'UserId',
      type: 'string',
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Contact',
      type: 'string',
    }),
    defineField({
      name: 'photoUrl',
      title: 'Image',
      type: 'string',
    }),
  ],
})
