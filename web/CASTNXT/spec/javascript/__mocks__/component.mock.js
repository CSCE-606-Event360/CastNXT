export const mockBoilerplate = (props, name) => {
    jest.fn(props)
    const customTag = `mock-${name}`;
    return (
        <customTag props={props}>{props.children}</customTag>
    )
}