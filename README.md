1. React ничего не знает о работе с сервером - это задача для других библиотек
2. Сетевой код нужно изолировать от кода компонентов
3. Если необходимо, трансоформируйте данные до того, как их получит компонент
4. Обрабатывайте состояния "загрузка" и "ошибка"
5. Разделяйте ответственность компонентов: логику и рендеринг Segregation of Concerns

---------
**Lifecycle Methods**

----
MOUNTING
----
constructor() => render() => componentDidMount()
componentDidMount() - компонент "подключен" (DOM элементов на странице)

----
UPDATES
----
New Props => reder() => componentDidUpdate(prevProps, prevState)  
componentDidUpdate() - компонент обновился setState()


----
UNMOUNTING
----
componentWillUnmount() - компонент будет удален (но DOM еще на странице)

----
ERROR
----
componentDidCatch() - когда в компоненте (или в его child-компонентах) произошла ошибка