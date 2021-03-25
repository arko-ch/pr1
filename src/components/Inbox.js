import React, { Component } from 'react';
import user from '../images/user.png';
import './CSS/Common.css';
import './CSS/Inbox.css';

class Inbox extends Component {
  render() {
    return (
      <>
        <header>
          <div class="row row-equal align-center">
            <div class="col-12 col-md-6">
              <h3>entitled</h3>
            </div>
            <div class="col-12 col-md-6">
              <ul class="top-icons">
                <li>
                  <button class="btn-icon">
                    <i class="far fa-envelope"></i>
                  </button>
                </li>
                <li>
                  <button class="btn-icon">
                    <i class="fas fa-search"></i>
                  </button>
                </li>
                <li>
                  <button class="btn-icon">
                    <i class="fas fa-expand"></i>
                  </button>
                </li>
                <li>
                  <button class="btn-icon">
                    <i class="fas fa-sign-out-alt"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </header>
        <div class="wrapper bg-grey">
          <div class="container-fluid">
            <div class="mailBodyWrap">
              <div class="address-bar">
                <div class="innerBar">
                  <div class="icon">
                    <i class="fas fa-border-all"></i>
                  </div>
                  <div class="bar icon-purple active small-font">
                    <i class="fas fa-home"></i>
                    <span>St. Utica, Pennysylvania...</span>
                    <i class="fas fa-times"></i>
                  </div>
                  <div class="bar icon-yellow small-font">
                    <i class="fas fa-bolt"></i>
                    <span>St. Utica, Pennysylvania...</span>
                  </div>
                  <div class="bar icon-yellow small-font">
                    <i class="fas fa-bolt"></i>
                    <span>St. Utica, Pennysylvania...</span>
                  </div>
                  <div class="icon small-font">
                    <i class="fas fa-plus"></i>
                  </div>
                </div>
              </div>
              <div class="inboxWrap bor-bot">
                <div class="resizeableDiv">
                  <div class="row row-equal align-center p-15">
                    <div class="col-12 col-md-6 h-100">
                      <ul class="navMenu nav h-100 align-center">
                        <li class="nav-item h-100 align-center">
                          <a
                            href="javascript:void(0);"
                            class="nav-link active"
                            id="inbox"
                          >
                            Inbox
                          </a>
                        </li>
                        <li class="nav-item h-100 align-center">
                          <a
                            href="javascript:void(0);"
                            class="nav-link"
                            id="all"
                          >
                            All(21)
                          </a>
                        </li>
                        <li class="nav-item h-100 align-center">
                          <a
                            href="javascript:void(0);"
                            class="nav-link"
                            id="new"
                          >
                            New(6)
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div class="col-12 col-md-6 h-100">
                      <div class="buttonDiv">
                        <button class="btn btn-icon">
                          <i class="fas fa-search"></i>
                        </button>
                        <div class="filter">
                          <button class="btn btn-icon filterbtn">
                            <i class="fas fa-sort-amount-down"></i>
                          </button>
                          <div class="filter-div inboxFilter">
                            <p>Refine your search</p>
                            <form>
                              <div class="form-group">
                                <label for="from">From</label>
                                <select class="form-control" id="From">
                                  <option>All</option>
                                  <option>All</option>
                                  <option>All</option>
                                  <option>All</option>
                                </select>
                              </div>
                              <div class="form-group">
                                <label for="to">To</label>
                                <select class="form-control" id="to">
                                  <option>All</option>
                                  <option>All</option>
                                  <option>All</option>
                                  <option>All</option>
                                </select>
                              </div>
                              <div class="form-group">
                                <label for="category">Category</label>
                                <select class="form-control" id="category">
                                  <option>Highlighted</option>
                                  <option>Archive</option>
                                </select>
                              </div>
                              <div class="button-group">
                                <a href="javascript:void(0);" class="btn Reset">
                                  Reset Filter
                                </a>
                                <button type="submit" class="btn">
                                  Apply
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                        <button class="btn">
                          <i class="far fa-edit"></i>New Mail
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="inboxMails">
                    <div class="mails show" id="inbox">
                      <ul>
                        <li class="bor-top head-mail">
                          <div class="row row-equal">
                            <div class="col-1">
                              <div class="left">
                                <img src={user} />
                              </div>
                            </div>
                            <div class="col-8">
                              <div class="middle">
                                <div class="head">
                                  <a href="" class="small-font">
                                    Bryan Hewitt
                                  </a>
                                  <span>31 Dec 2020</span>
                                </div>
                                <div class="desc">
                                  <p class="small-font">
                                    Lorem Ipsum is simply dummy text of the
                                    printing
                                  </p>
                                  <a href="" class="small-font">
                                    <i class="fas fa-paperclip"></i> Attachment(
                                    <span class="count">1</span>)
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div class="col-3 align-center">
                              <div class="right text-center">
                                <img src={user} />
                              </div>
                            </div>
                          </div>
                          <ul class="chat-chain">
                            <li class="bor-top">
                              <div class="row row-equal">
                                <div class="col-1">
                                  <div class="left">
                                    <img src={user} />
                                  </div>
                                </div>
                                <div class="col-7">
                                  <div class="middle">
                                    <div class="head">
                                      <a href="" class="small-font">
                                        Bryan Hewitt
                                      </a>
                                      <span>31 Dec 2020</span>
                                    </div>
                                    <div class="desc">
                                      <p class="small-font">
                                        Lorem Ipsum is simply dummy text of the
                                        printing
                                      </p>
                                      <a href="" class="small-font">
                                        <i class="fas fa-paperclip"></i>{' '}
                                        Attachment(<span class="count">1</span>)
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-4">
                                  <div class="mail-chain-icons">
                                    <ul>
                                      <li>
                                        <a href="">
                                          <i class="fas fa-reply"></i>
                                        </a>
                                      </li>
                                      <li>
                                        <a href="">
                                          <i class="fas fa-reply-all"></i>
                                        </a>
                                      </li>
                                      <li>
                                        <a href="">
                                          <i class="fas fa-check"></i>
                                        </a>
                                      </li>
                                      <li>
                                        <a href="">
                                          <i class="fas fa-ellipsis-v"></i>
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                  <div class="right text-center">
                                    <img src={user} />
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </li>
                        <li class="bor-top hed-mail">
                          <div class="row row-equal">
                            <div class="col-1">
                              <div class="left">
                                <img src={user} />
                              </div>
                            </div>
                            <div class="col-8">
                              <div class="middle">
                                <div class="head">
                                  <a href="" class="small-font">
                                    Bryan Hewitt
                                  </a>
                                  <span>31 Dec 2020</span>
                                </div>
                                <div class="desc">
                                  <p class="small-font">
                                    Lorem Ipsum is simply dummy text of the
                                    printing
                                  </p>
                                  <a href="" class="small-font">
                                    <i class="fas fa-paperclip"></i> Attachment(
                                    <span class="count">1</span>)
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div class="col-3 align-center">
                              <div class="right text-center">
                                <img src={user} />
                              </div>
                            </div>
                          </div>
                        </li>
                        <li class="bor-top hed-mail">
                          <div class="row row-equal">
                            <div class="col-1">
                              <div class="left">
                                <img src={user} />
                              </div>
                            </div>
                            <div class="col-8">
                              <div class="middle">
                                <div class="head">
                                  <a href="" class="small-font">
                                    Bryan Hewitt
                                  </a>
                                  <span>31 Dec 2020</span>
                                </div>
                                <div class="desc">
                                  <p class="small-font">
                                    Lorem Ipsum is simply dummy text of the
                                    printing
                                  </p>
                                  <a href="" class="small-font">
                                    <i class="fas fa-paperclip"></i> Attachment(
                                    <span class="count">1</span>)
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div class="col-3 align-center">
                              <div class="right text-center">
                                <img src={user} />
                              </div>
                            </div>
                          </div>
                        </li>
                        <li class="bor-top hed-mail">
                          <div class="row row-equal">
                            <div class="col-1">
                              <div class="left">
                                <img src={user} />
                              </div>
                            </div>
                            <div class="col-8">
                              <div class="middle">
                                <div class="head">
                                  <a href="" class="small-font">
                                    Bryan Hewitt
                                  </a>
                                  <span>31 Dec 2020</span>
                                </div>
                                <div class="desc">
                                  <p class="small-font">
                                    Lorem Ipsum is simply dummy text of the
                                    printing
                                  </p>
                                  <a href="" class="small-font">
                                    <i class="fas fa-paperclip"></i> Attachment(
                                    <span class="count">1</span>)
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div class="col-3 align-center">
                              <div class="right text-center">
                                <img src={user} />
                              </div>
                            </div>
                          </div>
                        </li>
                        <li class="bor-top hed-mail">
                          <div class="row row-equal">
                            <div class="col-1">
                              <div class="left">
                                <img src={user} />
                              </div>
                            </div>
                            <div class="col-8">
                              <div class="middle">
                                <div class="head">
                                  <a href="" class="small-font">
                                    Bryan Hewitt
                                  </a>
                                  <span>31 Dec 2020</span>
                                </div>
                                <div class="desc">
                                  <p class="small-font">
                                    Lorem Ipsum is simply dummy text of the
                                    printing
                                  </p>
                                  <a href="" class="small-font">
                                    <i class="fas fa-paperclip"></i> Attachment(
                                    <span class="count">1</span>)
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div class="col-3 align-center">
                              <div class="right text-center">
                                <img src={user} />
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div class="mails" id="all">
                      <ul>
                        <li class="bor-top hed-mail">
                          <div class="row row-equal">
                            <div class="col-1">
                              <div class="left">
                                <img src={user} />
                              </div>
                            </div>
                            <div class="col-8">
                              <div class="middle">
                                <div class="head">
                                  <a href="" class="small-font">
                                    Bryan Hewitt
                                  </a>
                                  <span>31 Dec 2020</span>
                                </div>
                                <div class="desc">
                                  <p class="small-font">
                                    Lorem Ipsum is simply dummy text of the
                                    printing
                                  </p>
                                  <a href="" class="small-font">
                                    <i class="fas fa-paperclip"></i> Attachment(
                                    <span class="count">1</span>)
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div class="col-3 align-center">
                              <div class="right text-center">
                                <img src={user} />
                              </div>
                            </div>
                          </div>
                          <ul class="chat-chain">
                            <li class="bor-top">
                              <div class="row row-equal">
                                <div class="col-1">
                                  <div class="left">
                                    <img src={user} />
                                  </div>
                                </div>
                                <div class="col-8">
                                  <div class="middle">
                                    <div class="head">
                                      <a href="" class="small-font">
                                        Bryan Hewitt
                                      </a>
                                      <span>31 Dec 2020</span>
                                    </div>
                                    <div class="desc">
                                      <p class="small-font">
                                        Lorem Ipsum is simply dummy text of the
                                        printing
                                      </p>
                                      <a href="" class="small-font">
                                        <i class="fas fa-paperclip"></i>{' '}
                                        Attachment(<span class="count">1</span>)
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-3 align-center">
                                  <div class="right text-center">
                                    <img src={user} />
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                    <div class="mails" id="new">
                      <ul>
                        <li class="bor-top hed-mail">
                          <div class="row row-equal">
                            <div class="col-1">
                              <div class="left">
                                <img src={user} />
                              </div>
                            </div>
                            <div class="col-8">
                              <div class="middle">
                                <div class="head">
                                  <a href="" class="small-font">
                                    Bryan Hewitt
                                  </a>
                                  <span>31 Dec 2020</span>
                                </div>
                                <div class="desc">
                                  <p class="small-font">
                                    Lorem Ipsum is simply dummy text of the
                                    printing
                                  </p>
                                  <a href="" class="small-font">
                                    <i class="fas fa-paperclip"></i> Attachment(
                                    <span class="count">1</span>)
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div class="col-3 align-center">
                              <div class="right text-center">
                                <img src={user} />
                              </div>
                            </div>
                          </div>
                          <ul class="chat-chain">
                            <li class="bor-top">
                              <div class="row row-equal">
                                <div class="col-1">
                                  <div class="left">
                                    <img src={user} />
                                  </div>
                                </div>
                                <div class="col-8">
                                  <div class="middle">
                                    <div class="head">
                                      <a href="" class="small-font">
                                        Bryan Hewitt
                                      </a>
                                      <span>31 Dec 2020</span>
                                    </div>
                                    <div class="desc">
                                      <p class="small-font">
                                        Lorem Ipsum is simply dummy text of the
                                        printing
                                      </p>
                                      <a href="" class="small-font">
                                        <i class="fas fa-paperclip"></i>{' '}
                                        Attachment(<span class="count">1</span>)
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-3 align-center">
                                  <div class="right text-center">
                                    <img src={user} />
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Inbox;
