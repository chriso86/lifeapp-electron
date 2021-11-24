module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                productName:"LifeApp",
                appId:"org.lifeapp",
                dmg:{
                    contents:[
                        {
                            x: 130,
                            y: 220
                        },
                        {
                            x: 410,
                            y: 220,
                            type: 'link',
                            path: '/Applications'
                        }
                    ]
                },
                win: {
                    target:[
                        "nsis",
                        "msi"
                    ]
                },
                linux: {
                    target:[
                        "deb",
                        "rpm",
                        "snap",
                        "AppImage"
                    ],
                    category: "Development"
                },
                directories: {
                    buildResources: './build',
                    output: 'dist'
                },
                files: [
                    '**/*',
                    'build/icon.*'
                ],
                publish: [{
                    provider: "github",
                    owner: "chriso86",
                    repo: "routineplanner",
                    releaseType: 'draft'
                }]
            }
        }
    },
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "@/theme/index.scss";`
            }
        }
    }
}
