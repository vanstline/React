
// 数据验证
let propTypes = {
    todo: PT.object,
    onDestroy: PT.func,
    onToggle: PT.func,
    itemEditDone: PT.func
}

export default class Item extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
          inEdit: false,
          val: ''
        };

        this.onEdit = this.onEdit.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onEnter = this.onEnter.bind(this);
        this.inputChange = this.inputChange.bind(this);
    }

    itemEditDone() {

      this.setState({
        inEdit: false
      });

      let {itemEditDone, todo} = this.props;

      itemEditDone(todo, this.state.val);
    }

    inputChange(ev) {
      this.setState({
        val: ev.target.value
      })
    }

    onBlur() {
      this.itemEditDone();
    }

    onEnter(ev) {
      if(ev.keyCode !== 13) return;

      this.itemEditDone();

    }

    onEdit() {
      let {value} = this.props.todo;
      this.setState({
        inEdit: true,
        val: value
      }, () => this.refs.editInput.focus());

      // state是异步更新的  所以函数应放置在 回调函数里
    }

    render(){

        let {onEdit, onBlur, onEnter, inputChange} = this;

        // 接受从 app 传入的 props;
        let {todo, onDestroy, onToggle} = this.props;

        let {inEdit, val} = this.state;

        let itemClassName = todo.hasCompelted ? 'completed' : '';

        if(inEdit) itemClassName += 'editing';

        return (

            <li className={itemClassName}>
                <div className='view'>
                    <input
                        type='checkbox'
                        className='toggle'
                        checked = {todo.hasCompelted}
                        onChange = {ev => onToggle(todo)}
                    />
                    <label
                      onDoubleClick = {onEdit}
                      ref = 'label'
                    >
                        {todo.value}
                    </label>
                    <button
                        className='destroy'
                        onClick = { ev => onDestroy(todo)}
                        ref = 'btn'
                    ></button>
                </div>
                <input
                  type='text'
                  className='edit'
                  value = {val}
                  onBlur = {onBlur}
                  onKeyDown = {onEnter}
                  onChange = {inputChange}
                  ref = 'editInput'
                />
            </li>
        )
    }
}

Item.propTypes = propTypes
