#!/usr/bin/env node

import inquirer from 'inquirer'
import path from 'path'
import fs from 'fs'
import {execSync} from 'child_process'

const prefix = '[create-canlooks] '

const choices = ['react-webpage', 'react-electron'] as const

console.log('Hi. Canlooks CLI. ૮(˶ᵔ ᵕ ᵔ˶)ა\n')

inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Project name',
        required: true
    },
    {
        type: 'list',
        name: 'template',
        message: 'Choose a template',
        choices,
    }
]).then(async ({name, template}: {
    name: string
    template: typeof choices[number]
}) => {
    console.time(prefix + 'Created')
    console.log(prefix + 'Creating project...')

    // 复制模板文件
    const templatePath = path.join(__dirname, '../templates', template)
    const destinationPath = path.resolve(name)
    fs.cpSync(templatePath, destinationPath, {recursive: true})

    // 修改package.json的name字段
    const packageJsonPath = path.join(destinationPath, 'package.json')
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
    packageJson.name = name
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

    console.timeEnd(prefix + 'Created')

    console.time(prefix + 'Done')
    console.log(prefix + 'Installing dependencies...')

    // 安装依赖
    execSync('npm i', {
        stdio: 'inherit',
        cwd: destinationPath
    })

    console.timeEnd(prefix + 'Done')
})