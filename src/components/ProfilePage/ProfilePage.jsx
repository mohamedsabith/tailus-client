import React from "react";
import "./style.css";

const ProfilePage = () => {
  return (
    <React.Fragment>
      <main className="bg-gray-100 bg-opacity-25">
        <div className="lg:w-8/12 lg:mx-auto mb-8">
          <header className="flex flex-wrap items-center p-4 md:py-8">
            <div className="md:w-3/12 md:ml-16">
              <img
                className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full
                   border-2 border-blue-600 p-1"
                src="https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
                alt="profile"
              />
            </div>

            <div className="w-8/12 md:w-7/12 ml-4">
              <div className="md:flex md:flex-wrap md:items-center mb-4">
                <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
                  mrtravlerrr_
                </h2>

                <a
                  href="/"
                  className="bg-gray-500 px-2 py-1 
                      text-white font-semibold text-sm rounded block text-center 
                      sm:inline-block sm:ml-4"
                >
                  Edit Profile
                </a>
              </div>

              <ul className="hidden md:flex space-x-8 mb-4">
                <li>
                  <span className="font-semibold">136</span>
                  posts
                </li>

                <li>
                  <span className="font-semibold">40.5k</span>
                  followers
                </li>
                <li>
                  <span className="font-semibold">302</span>
                  following
                </li>
              </ul>

              <div className="hidden md:block">
                <h1 className="font-semibold uppercase">Mr Travlerrr</h1>
                <span>Travel, Nature and Music</span>
                <p>Lorem ipsum dolor sit amet consectetur</p>
              </div>
            </div>

            <div className="md:hidden text-sm my-2">
              <h1 className="font-semibold">Mr Travlerrr...</h1>
              <span>Travel, Nature and Music</span>
              <p>Lorem ipsum dolor sit amet consectetur</p>
            </div>
          </header>

          <div className="px-px md:px-3">
            <ul
              className="flex md:hidden justify-around space-x-8 border-t 
              text-center p-2 text-gray-600 leading-snug text-sm"
            >
              <li>
                <span className="font-semibold text-gray-800 block">136</span>
                posts
              </li>

              <li>
                <span className="font-semibold text-gray-800 block">40.5k</span>
                followers
              </li>
              <li>
                <span className="font-semibold text-gray-800 block">302</span>
                following
              </li>
            </ul>

            <ul
              className="flex items-center justify-around md:justify-center space-x-12  
                  uppercase tracking-widest font-semibold text-xs text-gray-600
                  border-t"
            >
              <li className="md:border-t md:border-gray-700 md:-mt-px md:text-gray-700">
                <a className="inline-block p-3" href="/">
                  <i className="fas fa-th-large text-xl md:text-xs"></i>
                  <span className="hidden md:inline ml-1">post</span>
                </a>
              </li>
              <li>
                <a className="inline-block p-3" href="/">
                  <i className="far fa-bookmark text-xl md:text-xs"></i>
                  <span className="hidden md:inline ml-1">saved</span>
                </a>
              </li>
              <li>
                <a className="inline-block p-3" href="/">
                  <i className="fas fa-tag text-xl md:text-xs"></i>
                  <span className="hidden md:inline ml-1">tagged</span>
                </a>
              </li>
            </ul>

            <div className="flex flex-wrap -mx-px md:-mx-3">
              <div className="w-1/3 p-px md:px-3">
                <a href="/">
                  <article className="post bg-gray-100 text-white relative pb-full md:mb-6">
                    <img
                      className="w-full h-full absolute left-0 top-0 object-cover"
                      src="https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                      alt="post"
                    />

                    <i className="fas fa-square absolute right-0 top-0 m-1"></i>

                    <div
                      className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute 
                              left-0 top-0 hidden"
                    >
                      <div
                        className="flex justify-center items-center 
                                  space-x-4 h-full"
                      >
                        <span className="p-2">
                          <i className="fas fa-heart"></i>
                          412K
                        </span>

                        <span className="p-2">
                          <i className="fas fa-comment"></i>
                          2,909
                        </span>
                      </div>
                    </div>
                  </article>
                </a>
              </div>

              <div className="w-1/3 p-px md:px-3">
                <a href="/">
                  <article className="post bg-gray-100 text-white relative pb-full md:mb-6">
                    <img
                      className="w-full h-full absolute left-0 top-0 object-cover"
                      src="https://images.unsplash.com/photo-1498409570040-05bf6d3dd5b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                      alt="post"
                    />

                    <div
                      className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute 
                              left-0 top-0 hidden"
                    >
                      <div
                        className="flex justify-center items-center 
                                  space-x-4 h-full"
                      >
                        <span className="p-2">
                          <i className="fas fa-heart"></i>
                          412K
                        </span>

                        <span className="p-2">
                          <i className="fas fa-comment"></i>
                          1,993
                        </span>
                      </div>
                    </div>
                  </article>
                </a>
              </div>

              <div className="w-1/3 p-px md:px-3">
                <a href="/">
                  <article className="post bg-gray-100 text-white relative pb-full  md:mb-6">
                    <img
                      className="w-full h-full absolute left-0 top-0 object-cover"
                      src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                      alt="post"
                    />

                    <div
                      className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute 
                              left-0 top-0 hidden"
                    >
                      <div
                        className="flex justify-center items-center 
                                  space-x-4 h-full"
                      >
                        <span className="p-2">
                          <i className="fas fa-heart"></i>
                          112K
                        </span>

                        <span className="p-2">
                          <i className="fas fa-comment"></i>
                          2,090
                        </span>
                      </div>
                    </div>
                  </article>
                </a>
              </div>

              <div className="w-1/3 p-px md:px-3">
                <a href="/">
                  <article className="post bg-gray-100 text-white relative pb-full md:mb-6">
                    <img
                      className="w-full h-full absolute left-0 top-0 object-cover"
                      src="https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                      alt="post"
                    />

                    <i className="fas fa-video absolute right-0 top-0 m-1"></i>

                    <div
                      className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute 
                              left-0 top-0 hidden"
                    >
                      <div
                        className="flex justify-center items-center 
                                  space-x-4 h-full"
                      >
                        <span className="p-2">
                          <i className="fas fa-heart"></i>
                          841K
                        </span>

                        <span className="p-2">
                          <i className="fas fa-comment"></i>
                          909
                        </span>
                      </div>
                    </div>
                  </article>
                </a>
              </div>

              <div className="w-1/3 p-px md:px-3">
                <a href="/">
                  <article className="post bg-gray-100 text-white relative pb-full md:mb-6">
                    <img
                      className="w-full h-full absolute left-0 top-0 object-cover"
                      src="https://images.unsplash.com/photo-1475688621402-4257c812d6db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
                      alt="post"
                    />
                    <div
                      className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute 
                              left-0 top-0 hidden"
                    >
                      <div
                        className="flex justify-center items-center 
                                  space-x-4 h-full"
                      >
                        <span className="p-2">
                          <i className="fas fa-heart"></i>
                          120K
                        </span>

                        <span className="p-2">
                          <i className="fas fa-comment"></i>
                          3,909
                        </span>
                      </div>
                    </div>
                  </article>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default ProfilePage;
