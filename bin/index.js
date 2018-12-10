#! /usr/bin/env node

const program = require('commander')
const inquirer = require('inquirer')
const chalk = require('chalk')
program
    .command('module')
    .alias('m')
    .description('创建新的模块')
    // 通过命令行传入的参数会被挂载在 program.name上
    .option('-a, --name [moduleName]', '传入模块名', moduleName => {
        console.log("moduleName的配置是：", moduleName)
        // 如果在option()方法里有回调则需要将传入参数传递下去，否则会被拦截
        return moduleName
    })
    .option('--sass', '启用sass')
    .option('--less', '启用less')
    .action(option => {
        console.log("默认的option：", option)
        var config = Object.assign({
            name: '',
            description: '',
            sass: false,
            less: false
        }, option)
        var promps = []
        if (config.moduleName !== 'string') {
            promps.push({
                type: 'input',
                name: 'moduleName',
                message: '请输入模块名称',
                validate: function (input) {
                    if (!input) {
                        return '不能为空'
                    }
                    return true
                }
            })
        }
        if (config.description !== 'string') {
            promps.push({
                type: 'input',
                name: 'moduleDescription',
                message: '请输入模块描述'
            })
        }
        if (config.sass === false && config.less === false) {
            promps.push({
                type: 'list',
                name: 'cssPretreatment',
                message: '想用什么css预处理器呢',
                choices: [{
                        name: 'Sass/Compass',
                        value: 'sass'
                    },
                    {
                        name: 'Less',
                        value: 'less'
                    }
                ]
            })
        }
        inquirer.prompt(promps).then(answers => {
            console.log(answers)
        })
    })
    .on('--help', function () {
        console.log('  Examples:')
        console.log('')
        console.log('$ app module moduleName')
        console.log('$ app m moduleName')
    })
program.parse(process.argv)