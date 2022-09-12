import { serverBaseUrl } from "../api/api-config";

export const fetchData = ({tableName, pageNumber, limit}) => {
    return (dispatch) => {
        fetch(`${serverBaseUrl}${tableName}?&_page=${pageNumber}&_limit=${limit}`).then(res => {
            const count = res.headers?.get('X-Total-Count') || 30;
            res.json().then(response => {
              dispatch({
                  type: 'getData',
                  payload: {key: tableName, data: response, totalCount: +count}
              });
            }).catch((err) => dispatch({type: 'NA'}));
        });
    };
}

export const postData = ({tableName, dataSource}) => {
    return (dispatch) => {
        fetch(`${serverBaseUrl}${tableName}`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataSource),
        }).then((result) => result.json()).then((data) => {
            dispatch({
                type: 'setData',
                payload: {data, key: tableName}
            });
        });
    }
}