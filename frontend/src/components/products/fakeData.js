const fakeData = [
    {
        id: 1,
        category_id: 1,
        title: 'Lorem ipsum dolor',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        price_ht: 18.99,
        tva:5.5,
        quantity: 10,
        status: true,
        top:1,
    },
    {
        id: 2,
        category_id: 3,
        title: 'Lorem ipsum dolor',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        price_ht: 18.99,
        tva:5.5,
        quantity: 10,
        status: true,
        top:1,
    },
    {
        id: 3,
        category_id: 2,
        title: 'Lorem ipsum dolor',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        price_ht: 18.99,
        tva:5.5,
        quantity: 10,
        status: true,
        top:1,
    },
    {
        id: 4,
        category_id: 1,
        title: 'Lorem ipsum dolor',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        price_ht: 18.99,
        tva:5.5,
        quantity: 10,
        status: true,
        top:1,
    },
    {
        id: 5,
        category_id: 2,
        title: 'Lorem ipsum dolor',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        price_ht: 18.99,
        tva:5.5,
        quantity: 10,
        status: true,
        top:1,
    },
    {
        id: 6,
        category_id: 4,
        title: 'Lorem ipsum dolor',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        price_ht: 18.99,
        tva:5.5,
        quantity: 10,
        status: true,
        top:1,
    },
    {
        id: 7,
        category_id: 2,
        title: 'Lorem ipsum dolor',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        price_ht: 18.99,
        tva:5.5,
        quantity: 10,
        status: true,
        top:1,
    },
    {
        id: 8,
        category_id: 4,
        title: 'Lorem ipsum dolor',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        price_ht: 18.99,
        tva:5.5,
        quantity: 10,
        status: true,
        top:1,
    },
    {
        id: 9,
        category_id: 1,
        title: 'Lorem ipsum dolor',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        price_ht: 18.99,
        tva:5.5,
        quantity: 10,
        status: true,
        top:1,
    },
    {
        id: 10,
        category_id: 2,
        title: 'Lorem ipsum dolor',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        price_ht: 18.99,
        tva:5.5,
        quantity: 10,
        status: true,
        top:1,
    },
    {
        id: 11,
        category_id: 4,
        title: 'Lorem ipsum dolor',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        price_ht: 18.99,
        tva:5.5,
        quantity: 10,
        status: true,
        top:1,
    },
    {
        id: 12,
        category_id: 3,
        title: 'Lorem ipsum dolor',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        price_ht: 18.99,
        tva:5.5,
        quantity: 10,
        status: true,
        top:1,
    },
    {
        id: 13,
        category_id: 2,
        title: 'Lorem ipsum dolor',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        price_ht: 18.99,
        tva:5.5,
        quantity: 10,
        status: true,
        top:1,
    },
    {
        id: 14,
        category_id: 4,
        title: 'Lorem ipsum dolor',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        price_ht: 18.99,
        tva:5.5,
        quantity: 10,
        status: true,
        top:1,
    },
    {
        id: '15',
        category_id: 1,
        title: 'Lorem ipsum dolor',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        price_ht: 18.99,
        tva:5.5,
        quantity: 10,
        status: true,
        top:1,
    },
    {
        id: '16',
        category_id: 3,
        title: 'Lorem ipsum dolor',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        price_ht: 18.99,
        tva:5.5,
        quantity: 10,
        status: true,
        top:1,
    },
    {
        id: '17',
        category_id: 2,
        title: 'Lorem ipsum dolor',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        price_ht: 18.99,
        tva:5.5,
        quantity: 10,
        status: true,
        top:1,
    },
    {
        id: '18',
        category_id: 1,
        title: 'Lorem ipsum dolor',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        price_ht: 18.99,
        tva:5.5,
        quantity: 10,
        status: true,
        top:1,
    },
    {
        id: '19',
        category_id: 4,
        title: 'Lorem ipsum dolor',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        price_ht: 18.99,
        tva:5.5,
        quantity: 10,
        status: true,
        top:1,
    },

];

export default fakeData;