#!/usr/bin/env node

import inquirer from 'inquirer'

(async () => {
    const {template} = await inquirer.prompt({
        type: 'list',
        name: 'template',
        message: 'Choose a template',
        choices: ['react', 'vue', 'angular'],
    })
    console.log(12, template)
})()