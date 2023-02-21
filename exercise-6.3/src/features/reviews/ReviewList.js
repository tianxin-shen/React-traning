import Review from "./Review";
import ReviewForm from "./ReviewForm";
import * as api from "../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectBookById } from "../books/bookSlice";
import { store } from "../../app/store";
import { reviewsAsync, selectReviewById } from "./reviewSlice";

function ReviewList() {
  const { bookId, title } = useParams();
  const book = useSelector((state) => selectBookById(state, +bookId));
  const reviews = useSelector((state) => selectReviewById(state, +bookId));

  useEffect(() => {
    store.dispatch(reviewsAsync(+bookId));
  }, [bookId]);

  return (
    <div className="row">
      <h2>Reviews of {title}:</h2>
      <div className="row">
        <div className="col-3">
          <img src={book.cover || "/NoImage.png"} alt={book.title} />
        </div>
        <div className="col">
          <p></p>
          <p>Written By</p>
          <p>
            <strong>{book.author}</strong>
          </p>
        </div>
      </div>
      <div className="table-responsive">
        <ReviewForm bookId={+bookId} />
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Review</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map(function (item, i) {
              return <Review review={item.content} key={i} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReviewList;
