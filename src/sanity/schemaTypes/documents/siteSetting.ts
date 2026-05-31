import { GiGearHammer } from 'react-icons/gi';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const siteSettingType = defineType({
  name: 'siteSetting',
  title: 'Site Setting',
  icon: GiGearHammer,
  type: 'document',
  groups: [
    { name: 'branding', title: 'Branding' },
    { name: 'navigation', title: 'Navigation' },
    { name: 'footer', title: 'Footer' },
  ],
  fields: [
    // branding
    defineField({
      name: 'siteName',
      title: 'Website Name',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'branding',
    }),
    defineField({
      name: 'primaryLogo',
      title: 'Primary Logo',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
      group: 'branding',
    }),
    defineField({
      name: 'secondaryLogo',
      title: 'Secondary Logo',
      type: 'imageWithAlt',
      group: 'branding',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Platform Links',
      type: 'array',
      of: [{ type: 'socialLink' }],
      validation: (rule) => rule.required(),
      group: 'branding',
    }),
    defineField({
      name: 'featuredBrand',
      title: 'Featured Brand',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Feature Brand Name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Brand Image',
              type: 'imageWithAlt',
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
      group: 'branding',
    }),
    defineField({
      name: 'memberAccessFeatures',
      title: 'Member Access features',
      type: 'array',
      group: 'branding',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
            }),
            defineField({
              name: 'body',
              type: 'text',
            }),
            defineField({
              name: 'image',
              type: 'imageWithAlt',
            }),
          ],
        }),
      ],
    }),

    // navigation
    defineField({
      name: 'navigation',
      title: `Main site's navigation menu`,
      type: 'array',
      group: 'navigation',
      of: [
        defineArrayMember({
          name: 'navLink',
          title: 'Navigation Link',
          description:
            'This will appear on the website as a clickable link to go to different pages',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Navigation Label',
              description:
                'This label will be display as the name of the page on the website',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'Destination URL',
              description:
                'This URL should be the full URL of the page on the website',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'isButton',
              title: 'Is Button?',
              description: 'Is this link should be displayed as text or button',
              type: 'boolean',
              initialValue: false,
              validation: (rule) => rule.required(),
            }),
          ],
        }),
        defineArrayMember({
          name: 'navDropdown',
          type: 'object',
          title: 'Navigation Dropdown',
          description:
            'This will be displayed as a list of navigation links as a dropdown group',
          fields: [
            defineField({
              name: 'label',
              title: 'Dropdown Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'dropdownItems',
              title: 'Dropdown Items',
              type: 'array',
              of: [
                {
                  name: 'dropdownItem',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Navigation Label',
                      description:
                        'This label will be display as the name of the page on the website',
                      type: 'string',
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: 'href',
                      title: 'Destination URL',
                      description:
                        'This URL should be the full URL of the page on the website',
                      type: 'string',
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: 'isButton',
                      title: 'Is Button?',
                      description:
                        'Is this link should be displayed as text or button',
                      type: 'boolean',
                      initialValue: false,
                      validation: (rule) => rule.required(),
                    }),
                  ],
                },
              ],
            }),
          ],
        }),
      ],
    }),

    // footer
    defineField({
      name: 'footerDescription',
      title: 'Footer Text',
      description: 'Footer text will be appear in the footer beside the logo',
      type: 'text',
      group: 'footer',
    }),
    defineField({
      name: 'footerColumns',
      title: 'Footer Columns',
      description:
        'These columns will be displayed as related links as column per column in the footer',
      type: 'array',
      group: 'footer',
      of: [
        defineArrayMember({
          name: 'footerColumn',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Column Title',
              type: 'string',
            }),
            defineField({
              name: 'links',
              title: 'Column Links',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Link Label',
                      type: 'string',
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: 'href',
                      title: 'Link URL',
                      type: 'string',
                      validation: (rule) => rule.required(),
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'contactInfo',
      group: 'footer',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({
          name: 'address1',
          title: 'Address 1',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'address2',
          title: 'Address 2',
          type: 'string',
        }),
        defineField({
          name: 'zip',
          title: 'Zip/Postal Code',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'city',
          title: 'City',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'state',
          title: 'State',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'country',
          title: 'Country',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'latitude',
          title: 'Latitude on Google Map',
          description: 'This is required for displaying the Map on the website',
          type: 'number',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'longitude',
          title: 'Longitude on Google Map',
          description: 'This is required for displaying the Map on the website',
          type: 'number',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'email',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'phone',
          title: 'Phone',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
  ],
});
