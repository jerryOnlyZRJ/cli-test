#! /usr/bin/env node

// cli驱动
const program = require('commander')
// 用户交互工具
const inquirer = require('inquirer')
// console.log填色美化
const chalk = require('chalk')
program
    .command('module')
    .alias('m')
    .description('创建新的模块')
    // 通过命令行传入的参数会被挂载在 program.name上
    .option('-a, --name [moduleName]', '传入模块名', moduleName => {
        console.log(chalk.red("moduleName的配置是："), chalk.bold(moduleName))
        // 如果在option()方法里有回调则需要将传入参数传递下去，否则会被拦截
        return moduleName
    })
    .option('--sass', '启用sass')   // 为提供传值的option会以boolean作为value
    .option('--less', '启用less')
    .action(option => {
        // 一个对象，key 为 option 的 --name
        // 如果用户在命令行阶段未传入值，则该对象中不存在该key
        console.log("用户通过命令行定义的options：", option)
        var config = Object.assign({
            name: undefined,
            description: undefined,
            sass: false,
            less: false
        }, option)
        var promps = []
        if (!config.name) {
            promps.push({
                type: 'input',
                name: 'name',
                message: chalk.blue('请输入模块名称'),
                validate: function (input) {
                    if (!input) {
                        return '不能为空'
                    }
                    return true
                }
            })
        }
        if (!config.description) {
            promps.push({
                type: 'input',
                name: 'description',
                message: chalk.magenta('请输入模块描述')
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
            console.log({
                ...config,
                ...answers,
            })
        })
    })
    .on('--help', function () {
        console.log('  Examples:')
        console.log('')
        console.log('$ cmd module moduleName')
        console.log('$ cmd m moduleName')
    })
program.parse(process.argv)