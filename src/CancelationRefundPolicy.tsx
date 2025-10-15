// src/CancellationPolicy.tsx
import React from 'react';
import './assets/css/CancelationRefundPolicy.css';

const CancellationPolicy: React.FC = () => {
    return (
        <div className="container cancellation-policy my-5">
            <h2 className="text-center mb-4">Cancellation & Refund Policy</h2>
            <p>
                In the Event Industry, all Event Service Vendors require advance payments for
                necessary arrangements, including food and staffing. For safety of both vendors
                and customers, the cancellation policy is as follows:
            </p>

            <div className="table-responsive">
                <table className="table table-bordered text-center mt-4">
                    <thead className="table-light">
                        <tr>
                            <th>Event Service</th>
                            <th>Cancellation Timing</th>
                            <th>Cancellation Fee</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* All Packages */}
                        <tr>
                            <td rowSpan={3}>All Packages</td>
                            <td>Before 7 days on the booking delivery date</td>
                            <td>0%</td>
                        </tr>
                        <tr>
                            <td>Before 3 days on the booking delivery date</td>
                            <td>60%</td>
                        </tr>
                        <tr>
                            <td>Before 2 days on the booking delivery date</td>
                            <td>100%</td>
                        </tr>

                        {/* All Food Related Services */}
                        <tr>
                            <td rowSpan={4}>All Food Related Services</td>
                            <td>Before 12 hours on the booking delivery date</td>
                            <td>100%</td>
                        </tr>
                        <tr>
                            <td>Before 24 hours</td>
                            <td>80%</td>
                        </tr>
                        <tr>
                            <td>Before 36 hours</td>
                            <td>60%</td>
                        </tr>
                        <tr>
                            <td>Before 48 hours</td>
                            <td>0%</td>
                        </tr>

                        {/* Other Event Related Services */}
                        <tr>
                            <td rowSpan={4}>Other Event Related Services</td>
                            <td>Before 12 hours</td>
                            <td>80%</td>
                        </tr>
                        <tr>
                            <td>Before 24 hours</td>
                            <td>60%</td>
                        </tr>
                        <tr>
                            <td>Before 36 hours</td>
                            <td>40%</td>
                        </tr>
                        <tr>
                            <td>Before 48 hours</td>
                            <td>0%</td>
                        </tr>

                        {/* Rental Services */}
                        <tr>
                            <td rowSpan={4}>Rental Services</td>
                            <td>Before 12 hours</td>
                            <td>80%</td>
                        </tr>
                        <tr>
                            <td>Before 24 hours</td>
                            <td>60%</td>
                        </tr>
                        <tr>
                            <td>Before 36 hours</td>
                            <td>40%</td>
                        </tr>
                        <tr>
                            <td>Before 48 hours</td>
                            <td>0%</td>
                        </tr>

                        {/* Shop Products */}
                        <tr>
                            <td rowSpan={2}>Shop Products</td>
                            <td>Before shipping</td>
                            <td>0%</td>
                        </tr>
                        <tr>
                            <td>After shipping</td>
                            <td>50%</td>
                        </tr>

                        {/* Platform / Delivery Partner Fault */}
                        <tr>
                            <td>Platform or Delivery Partner Fault</td>
                            <td>Any cancellation due to platform or delivery partner issues</td>
                            <td>0%</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="mt-4">
                <h4>Refund Policy</h4>
                <p>
                    We have a Money Back Guarantee if services or products are not delivered as
                    promised. Contact us at <a href="mailto:info@bookmypartys.com">info@bookmypartys.com</a>.
                    Our team will investigate, and if non-delivery is confirmed, the refund will be
                    processed within 7-10 working days.
                </p>

                <h4>Return Policy</h4>
                <p>
                    There is no return policy for event-related services or food orders. For shop
                    products (non-food), returns are accepted within 24 hours of delivery with a
                    valid reason. Return charges may apply based on product type and quantity.
                </p>
            </div>
        </div>
    );
};

export default CancellationPolicy;
