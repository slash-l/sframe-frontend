# sframe-app

#### 1. 简介
sframe 开发脚手架，集成常用公共组件，标准化各个环境的开发和发布流程，使开发人员专注业务的开发。

#### 2. 工程结构
```
sframe-app
    ├── account-server          用户管理中心
    ├── authorization-server    SSO 认证中心
    ├── product-server          产品 App
    └── sframe-frontend         工程前端
```

#### 3. 技术栈
##### 3.1 开发环境
| 开发环境   | 版本       |
| :----     | ----:     |
| JDK       | 13.0.2    |
| Gradle    | 6.1.1     |
| npm       | 6.13.4    |
| node      | 12.16.1   |
| docker    | 19.03.5   |

##### 3.2 开发框架
| 开发框架           | 版本               |
| :----             | ----:             |
| Spring Boot       | 2.2.5.RELEASE     |
| Vue               | 2.6.11            |
| vue-cli           | 4.2.3             |
| Ant-Design-Vue    | 1.5.2             |

##### 3.3 中间件
| 中间件       | 版本         |
| :----       | ----:       |
| MySQL       | 5.7         |

#### 4. 公共组件
- Spring Boot Security OAuth2 JWT 统一认证
- 国际化
- 文件管理
- Swagger UI
- 统一异常处理
- Rest Api 返回格式统一
- vue 集成 mock.js

具体使用方式参考 sframe-doc 文档
```
sframe-doc / 06_培训、手册 / 01_二次开发
```

#### 5. 服务启动
##### 5.1 中间件服务
通过 docker compose 一键启动
```
# 启动
docker-compose up -d

# 停止
docker-compose down

# 查看 compose 日志
docker-compose logs -f

# 查看启动容器
docker ps

# 查看容器日志
docker logs -f <container id>
```

##### 5.2 app 服务
后端服务（启动类 debug 启动）：  
account-server    
authorization-server    
product-server  
前端：  
sframe-frontend
```
npm run serve       // 本地 npm 启动
npm run serve:local // 本地 mock 方式启动
```

##### 5.3 访问地址
| 服务名                 | 访问地址                | 访问认证              |
| :----                 | :----                  | :----                |
| MySQL                 | localhost:3306         | root/123456          |
| account-server        | http://localhost:8081  |
| authorization-server  | http://localhost:8082  |
| product-server        | http://localhost:8083  |
| swagger-ui            | http://localhost:`<`port`>`/swagger-ui.html|
| sframe-frontend       | http://localhost:3000  |



