import "./Navbar.css"
importScripts("script.js")


function Nav() {
    return(
       <div>
        {/* main DIV */}
         <div className="title">
         <nav className='Navbar'>
           <div className='menu-btn'>
             <div className="line line--1"></div>
             <div className="line line--2"></div>
             <div className="line line--3"></div>  
           </div>
         
             {/* nav link */}

           <div className="nav-links">
             <a href="#title" className="link">Home</a>
             <a href="#contact" className="link">Contact</a>
             <a href="#skills" className="link">My Skills</a>
             <a href="#about" className="link">About</a>
           </div>

           <canvas className="canvas"></canvas>

         </nav>
         </div>
       {/* end of main DIV */}
        </div>
    )
}

export default Nav;