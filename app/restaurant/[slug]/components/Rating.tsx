import { Review } from "@prisma/client";
import { calculateReviewRating } from "../../../../utils/calculateReviewRating";

export default function Rating({ reviews }: { reviews: Review[] }) {
	const rating = calculateReviewRating(reviews);
	console.log(rating);

	return (
		<div className="flex items-end">
			<div className="ratings mt-2 flex items-center">
				<p>{"*".repeat(rating)}</p>
				<p className="text-reg ml-3">{rating.toFixed(1)}</p>
			</div>
			<div>
				<p className="text-reg ml-4">
					{reviews.length} Review{reviews.length === 1 ? "" : "s"}
				</p>
			</div>
		</div>
	);
}
