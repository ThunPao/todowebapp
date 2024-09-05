import LightSwitch from "./lightSwitch"

export default function NavBarPage() {

    return <>
        <div className="navbar bg-primary text-white">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Todo App</a>
            </div>
            <div className="flex-none">
                <LightSwitch />
            </div>
        </div>
    </>
}