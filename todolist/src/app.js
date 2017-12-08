
import Item from 'components/Item';
import Footer from 'components/Footer';

require('style/base.css');
require('style/index.css');

/**
 * todoList 的数据结构

    所有的list都应该是一个对象，我们把 所有的对象放置在一个数组里面
    这个对象至少应该具有三个属性

    id: 唯一值
    value:  list 的内容
    hasCompelted: list的完成状态 用 true/false 表示
 */

export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            todosData: [],
            inputVal: '',  //用于初始化 input的value  是的 input 受控
            view: 'all' // 处理视图的渲染
        }

        this.handleKeyDownPost = this.handleKeyDownPost.bind(this);
        this.onDestroy = this.onDestroy.bind(this);
        this.onClearCompleted = this.onClearCompleted.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.changeView = this.changeView.bind(this);
        this.itemEditDone = this.itemEditDone.bind(this);
    }

    itemEditDone(todo, value) {
      let {todosData} = this.state;

      todosData = todosData.map(elt => {
        if(todo.id === elt.id) {
          elt.value = value;
        }
        return elt
      });
      
    }

    /**
     * [changeView description]  渲染视图
     * @param  {[type]} view [description]
     * @return {[type]}      [description]
     */

    changeView(view) {
      this.setState({view})
    }

    /**
     * inputChange 事件
     */

     inputChange(ev) {
         this.setState({
             inputVal: ev.target.value
         })
     }

    /**
     * Enter 按下后触发事件
        创建初始化 todo
     */
    handleKeyDownPost(ev) {

        if(ev.keyCode !== 13) return;

        // let value = ev.target.value.trim();  // 这里可以使用 inputVal 来代替 input的value

        let {inputVal} = this.state;

        let value = inputVal.trim();

        if(value === '') return;

        let todo = {};
        todo.id = new Date().getTime();
        todo.value = value;
        todo.hasCompelted = false;

        let {todosData} = this.state;

        todosData.push(todo);

        this.setState({
            todosData,
            inputVal: ''
        });

    }

    /**
     * [toggleAll description] 全选
     * @param  {[type]} ev [description]
     * @return {[type]}    [description]
     */

    toggleAll(ev) {
      let {checked} = ev.target;

      let {todosData} = this.state;

      todosData = todosData.map(elt => {
        elt.hasCompelted = checked;
        return elt;
      });

      this.setState({todosData});
    }

    /**
     * [onToggle description] 处理单选
     * @param  {[type]} todo [description]
     * @return {[type]}      [description]
     */

    onToggle(todo) {
      let {todosData} = this.state;

      todosData = todosData.map(elt => {

        if(elt.id === todo.id) {
          elt.hasCompelted = !elt.hasCompelted;
        }
        return elt;
      });

      this.setState({todosData});
    }

    /**
     * 删除 todo
     */

    onDestroy( todo ) {
        let {todosData} = this.state;

        todosData = todosData.filter((elt) => {
            return elt.id !== todo.id;
        });

        this.setState({todosData});

    }

    /**
     * 删除已完成事项
     */

     onClearCompleted() {
         let {todosData} = this.state;

         todosData = todosData.filter((elt) => {
             return !elt.hasCompelted;
         });

         this.setState({todosData});
     }

    render(){

        let {handleKeyDownPost, onDestroy, onClearCompleted, inputChange, toggleAll, onToggle, changeView, itemEditDone} = this; // 将函数取出使用

        // 动态创建 item
        let {todosData, inputVal, view} = this.state;

        let items = null,
            footer = null,  // 如果没有 长度的时候 footer与左边全选不应该出现
            itemsBox = null;

        // 统计未完成的条数
        let leftCount = todosData.length;  // 初始为全部完成

        items = todosData.filter(elt => {  // 对底部栏进行过滤显示
          if(elt.hasCompelted) leftCount--;  // 如果没完成一个条 则长度减一
          switch (view) {
            case 'active':
              return !elt.hasCompelted;
            case 'completed':
              return elt.hasCompelted;
            default:
              return true;
          }
        });

        items = items.map((elt, i) => {

            return (
                <Item
                    {...{
                        onDestroy,
                        todo: elt,
                        onToggle,
                        itemEditDone
                    }}
                    key = {i}
                />
            )
        });

        if(todosData.length) {
          itemsBox = (
            <section className='main'>
                <input
                  type='checkbox'
                  className='toggle-all'
                  checked = {leftCount === 0} //如果全部都完成了
                  onChange = {toggleAll}
                />
                <ul className='todo-list'>
                    {
                        /* <Item/>  这里的 Item 应该是每次 Enter 后所创建的 */
                        items
                    }
                </ul>
            </section>
          );
          footer = (
            <Footer
              {...{
                leftCount,
                showClearBtton: leftCount < todosData.length,
                onClearCompleted,
                changeView,
                view
              }}
            />
          );
        }

        return (
            <div>
                <header className='header'>
                    <h1>todos</h1>
                    <input
                        type='text'
                        className='new-todo'
                        value = {inputVal}
                        onChange = {inputChange}
                        onKeyDown = {handleKeyDownPost}
                    />
                </header>
                {itemsBox}
                {footer}

            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept()
}
