import AppDispatcher from 'appDispatcher';

module.exports = {

    setCurrentItem: function(item){
        AppDispatcher.dispatch({
            type: 'NAV_SET_ITEM',
            item: item
        })
    }
};
