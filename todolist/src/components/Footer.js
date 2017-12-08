
let propTypes = {
  leftCount: PT.number,
  showClearBtton: PT.bool,
  onClearCompleted: PT.func,
  changeView: PT.func,
  view: PT.oneOf(['all', 'active', 'completed'])
}

export default class Footer extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){

        let {
          leftCount,
          showClearBtton,
          onClearCompleted,
          changeView,
          view
        } = this.props;
        let clearBtn = null;
        if(showClearBtton) {
          clearBtn = (
            <button
              className='clear-completed'
              onClick = {onClearCompleted}
            >
              clear all completed
            </button>
          )
        }
        return (
            <footer className='footer'>
                <span className='todo-count'>
                    <strong>{leftCount}</strong>
                    <span>item left</span>
                </span>
                <ul className='filters'>
                    <li>
                        <a
                          href='#/all'
                          className = {view === 'all'? 'selected' : ''}
                          onClick = {ev => changeView('all')}
                        >All</a>
                    </li>
                    <li>
                        <a
                          href='#/active'
                          className = {view === 'active'? 'selected' : ''}
                          onClick = {ev => changeView('active')}
                        >Active</a>
                    </li>
                    <li>
                        <a
                          href='#/completed'
                          className = {view === 'completed'? 'selected' : ''}
                          onClick = {ev => changeView('completed')}
                        >Aompleted</a>
                    </li>
                </ul>
                {clearBtn}
            </footer>
        )
    }
}

Footer.propTypes = propTypes;
