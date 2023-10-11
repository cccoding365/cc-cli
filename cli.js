#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const ejs = require('ejs')

inquirer.prompt([
    {
        type: 'input',
        name: 'projectName',
        message: 'Please enter the project name:'
    }
]).then(answers => {
    const tmpDir = path.join(__dirname, 'templates')
    const destDir = process.cwd()

    fs.readdir(tmpDir, (err, files) => {
        if (err) throw err
        files.forEach(file => {
            ejs.renderFile(path.join(tmpDir, file), answers, (err, result) => {
                if (err) throw err
                fs.writeFileSync(path.join(destDir, file), result)
            })
        })
    })
})