#iwjw-pc-alc(爱屋吉屋-PC-爱理财)

1.因为该项目从PC主站分离，公共部分是由主站提供，修改公共部分需要从主站重新生成`comlib`库，并复制到`build/comlib`目录，且`components、global、sass、webim`可能需要和主站保持一致。由于时间关系，目前只能手动解决，后期可能会考虑git-subtree或nodejs进行同步。  
2.为避免和主站资源冲突，所有爱理财代码**暂时**放在`alc`目录下开发，所以**请勿**引用`alc`文件夹以外的资源。

## Usage
###local

    npm run dev

>1.开发服务器启动后，双击命令行上的链接地址即可在浏览器中打开爱理财首页。你可以在`config`文件夹中修改你的开发服务器配置。
2.编写代码保存，浏览器即可热刷新。

**注意：**
>1.修改入口js不支持热刷新从而导致整个页面自动刷新。
2.页面在进入时闪烁，是因为css是通过js追加的。
3.该模式下生成的资源都是在内存中进行服务，不会输出到dist目录。
<u>这些都是正常现象，请放心使用！</u>
 

### test / beta / online
 
 	
	npm run prod
	
>1.打包，发布，上线都是这个命令。
2.你可以随时通过`Ctrl+C`终止操作下一步操作。
3.生成的资源在dist目录下，打包在zip目录下。
 	
###watch
	

    npm run watch

>1.一般用来检查webpack生成的代码。
2.生成的资源是无压缩的。
  
 	