### 运行步骤
```
    $ git clone git@github.com:ExcaliburZhou/eblog.git
    $ yarn                  // or npm install
    $ cd server
    $ yarn                  // or npm install
    $ yarn start            // or npm start
    $ cd ../app
    $ yarn                  // or npm install
    $ yarn start            // or npm start
```


### 项目结构
```
.
├── app
│   ├── dist
│   │   ├── bundle.js
│   │   ├── index.html
│   │   └── style.css
│   ├── public
│   │   └── index.html
│   ├── src
│   │   ├── container
│   │   │   └── Demo.js
│   │   ├── index.js
│   │   ├── routes.js
│   │   └── store.js
│   ├── webpack
│   │   ├── paths.js
│   │   ├── webpack.common.js
│   │   ├── webpack.dev.js
│   │   └── webpack.prod.js
│   ├── LICENSE.txt
│   ├── package.json
│   └── yarn.lock
├── server
│   ├── coverage
│   ├── config
│   ├── src
│   │   ├── config
│   │   └── index.js
│   ├── test
│   │   ├── index.js
│   │   └── mocha.opts
│   ├── LICENSE.txt
│   ├── nodemon.json
│   ├── package.json
│   └── yarn.lock
├── LICENSE
├── package.json
├── README.md
└── yarn.lock
```