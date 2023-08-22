const Layout = ({ children }) => {
    return (
        <div className="flex flex-col mt-20 items-center bg-gradient-to-b from-slate-100 to-white">
            { children }
        </div>
    )
}

export default Layout;