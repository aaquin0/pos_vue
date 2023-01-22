const setting = {
    title: 'Mosaic POS',
    version: '1.5',
    /**
     * @type {boolean} true | false
     * @description Whether show Hamburger
     */
    showHamburger: true,
    /**
     * @type {boolean} true | false
     * @description Whether show the settings right-panel
     */
    showLeftMenu: true,
    /**
     * @type {boolean} true | false
     * @description Whether show TagsView
     */
    showTagsView: true,
    /**
     * @description TagsView show number
     */
    tagsViewNum: 6,
    /**
     * @type {boolean} true | false
     * @description Whether show the top Navbar
     */
    showTopNavbar: true,
    /**
     * @type {boolean} true | false
     * @description Whether need nprogress
     */
    isNeedNprogress: true,

    /*page login/other*/
    /**
     * @type {boolean} true | false
     * @description Whether need login
     */
    isNeedLogin: true,
    /**
     * @type {string} 'roles' | 'code'
     */
    permissionMode: 'roles',
    /**
     * @type {string | array} 'dev' | ['prod','test','dev'] according to the .env file props of VITE_APP_ENV
     * @description Need show err logs component.
     * The default is only used in the production env
     * If you want to also use it in dev, you can pass ['dev', 'test']
     * sample params to send to api endpoint
     *  {
      pageUrl: String,
      errorLog: String,
      browserType: String,
      version: Number
    }
     */
    errorLog: [],
    /*
     * table height(100vh-delWindowHeight)
     * */
    delWindowHeight: '210px',
    /*
     * setting dev token when  isNeedLogin is setting false
     * */
    tmpToken: 'tmp_token',

    /*
     * vite.config.js base config
     * such as
     * */
    viteBasePath: './'
}

export default setting
