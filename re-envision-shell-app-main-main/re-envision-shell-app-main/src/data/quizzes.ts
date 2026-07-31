// Playable quiz questions for every unit, extracted from the unit pages in
// public/curriculum/ (multiple-choice and true/false items — the ones with
// selectable options). Keyed by lessonId. Regenerate rather than hand-edit.
export interface QuizQuestion {
  stem: string;
  choices: string[];
  correct: number;
  explain: string;
}

export const quizzes: Record<string, QuizQuestion[]> = {
  'course-1-deep-learning/unit1': [
    {
      'stem': 'A perceptron is trained on mean_radius and mean_texture to separate malignant from benign nuclei. What shape can its decision boundary take?',
      'choices': [
        'Any smooth curve that best fits the data',
        'A straight line only',
        'A step function with multiple thresholds',
        'A circle centered on the class mean'
      ],
      'correct': 1,
      'explain': 'The decision rule is w·x + b ≥ 0 , and the boundary where that expression equals zero is, in two dimensions, exactly a straight line. In higher dimensions it generalizes to a flat hyperplane — never a curve. A is wrong because "best fits the data" implies the model can bend to match the data\'s shape; a perceptron\'s boundary is fixed to be linear regardless of how well or poorly that fits the true class boundary. Trai'
    },
    {
      'stem': 'Why does stacking three linear layers with no activation function between them fail to add any representational power over a single linear layer?',
      'choices': [
        'Because linear layers cannot be trained with gradient descent',
        'Because the composition of affine maps is itself always a single affine map',
        'Because three layers always overfit a small clinical dataset',
        'Because linear layers require an odd number of hidden units'
      ],
      'correct': 1,
      'explain': 'W2(W1x + b1) + b2 algebraically simplifies to (W2W1)x + (W2b1 + b2) , which has the same form as a single layer\'s W\'x + b\' . This holds for any number of stacked linear layers — the collapse is exact, not approximate. A is wrong: linear layers train fine with gradient descent on their own (that\'s ordinary linear regression via gradient descent) — the issue here is representational power, not trainability. Overfitting'
    },
    {
      'stem': 'Complete the ReLU derivative function so that it correctly reports a zero gradient exactly where ReLU is flat.',
      'choices': [
        'np.ones_like(z)',
        '(z > 0).astype(float)',
        'np.maximum(0, z)',
        '1 / (1 + np.exp(-z))'
      ],
      'correct': 1,
      'explain': 'ReLU\'s derivative is 1 wherever the pre-activation z is positive and 0 wherever it\'s negative (undefined exactly at zero, conventionally taken as 0 or 1). (z > 0).astype(float) produces exactly that array of 1s and 0s. C, np.maximum(0, z) , is ReLU itself, not its derivative — a common mix-up when writing both functions quickly. D is the sigmoid function, unrelated to ReLU\'s derivative and never zero for any finite z'
    },
    {
      'stem': 'You\'re building the output layer for a model that classifies a lab panel into exactly one of three mutually exclusive categories: normal, prediabetic, diabetic. Which output-layer activation is appropriate?',
      'choices': [
        'A single sigmoid unit',
        'Softmax across three units',
        'No activation (linear output)',
        'ReLU across three units'
      ],
      'correct': 1,
      'explain': 'Softmax exponentiates each of the three units\' scores and normalizes them to sum to 1, producing a valid probability distribution over mutually exclusive classes — exactly the structure "exactly one of three categories" requires. A single sigmoid (A) only produces one probability and is the right choice for a binary yes/no call, not a three-way exclusive choice. ReLU (D) is never used on an output layer meant to repr'
    },
    {
      'stem': 'A diabetes-risk network takes a batch of 32 patients with 8 lab features each. The first hidden layer is supposed to produce 16 hidden units per patient. Find the bug in the shape setup.',
      'choices': [
        'b1 should be shape (32,) instead of (16,)',
        'W1 should be shape (8, 16) instead of (16, 8)',
        'X should be transposed to shape (8, 32)',
        'ReLU cannot be applied to a batch of inputs'
      ],
      'correct': 1,
      'explain': 'Matrix multiplication X @ W1 requires X \'s last dimension to match W1 \'s first dimension: (32, 8) @ (8, 16) → (32, 16) . With W1 as (16, 8) , the inner dimensions (8 vs 16) don\'t line up and NumPy raises a shape-mismatch error. The weight matrix for an n_in → n_out layer must be shaped (n_in, n_out) . C would technically make a different multiplication valid but destroys the batch convention (batch dimension must rid'
    }
  ],
  'course-1-deep-learning/unit2': [
    {
      'stem': 'A dense layer has weight matrix W of shape (3, 16) and you feed it a batch of 64 hourly readings, each with 3 features. What is the shape of the pre-activation output Z ?',
      'choices': [
        '(3, 16)',
        '(64, 3)',
        '(64, 16)',
        '(16, 64)'
      ],
      'correct': 2,
      'explain': 'X is (64, 3) , W is (3, 16) ; matrix multiplication cancels the shared inner dimension (3) and keeps the outer dimensions, giving (64, 16) — 64 rows, 16 learned features per row. (B) is a tempting distractor because it\'s just the input shape unchanged — but the whole point of the layer is to transform the feature dimension from 3 to 16, so the output can\'t have the same shape as the input.'
    },
    {
      'stem': 'A forward pass must cache its intermediate activations (like Z1 and A1 ) because Unit 3\'s computation reuses these exact values via the chain rule.',
      'choices': [
        'loss reduction',
        'backward pass / gradient',
        'softmax normalization',
        'batch shuffling'
      ],
      'correct': 1,
      'explain': 'Backpropagation applies the chain rule layer by layer, and each layer\'s local derivative depends on the actual activation values computed during the forward pass — so those values must be kept in memory, not discarded. Loss reduction (A) happens after the forward pass produces predictions and doesn\'t need intermediate layer activations, only the final output and the true labels.'
    },
    {
      'stem': 'Your demand forecaster\'s training data has a handful of hours where a faulty occupancy sensor logged a wildly wrong headcount, producing occasional huge prediction errors that don\'t reflect real model failure. Which regression loss is most robust to those occasional large outliers?',
      'choices': [
        'MSE, because squaring rewards large errors with more learning signal',
        'MAE, because it penalizes all error magnitudes proportionally rather than quadratically',
        'Categorical cross-entropy, because it handles multiple classes',
        'Sum-reduced MSE, because summing dilutes any one outlier\'s effect'
      ],
      'correct': 1,
      'explain': 'MAE grows linearly with error size, so one sensor-glitch hour with a huge error contributes proportionally to the total loss rather than dominating it the way a squared error would. (A) is backwards — MSE is exactly the loss that is most sensitive to outliers, since squaring a large error inflates it disproportionately, which is the opposite of what you want with unreliable sensor data.'
    },
    {
      'stem': 'This softmax implementation works fine on small logits but returns nan once logits get large (e.g. from a poorly scaled layer). What line is the bug, and what\'s the one-line fix?',
      'choices': [
        'Nothing is wrong; large logits are a data problem, not a code problem',
        'Subtract np.max(z) from z before exponentiating',
        'Replace np.exp with np.log',
        'Divide by len(z) instead of np.sum(exp_z)'
      ],
      'correct': 1,
      'explain': 'exp_z = np.exp(z - np.max(z)) keeps the largest exponent at exp(0) = 1 instead of overflowing on large logits, while leaving the mathematical result identical because the constant cancels between numerator and denominator. (D) would change what the function computes entirely (it\'s no longer a valid probability distribution) rather than fixing the numerical issue — the bug is about overflow in exp() , not about the no'
    },
    {
      'stem': 'Only 3% of hours in your dataset actually trip a peak-demand charge. Trained with plain unweighted BCE, your classifier reaches 97% accuracy by predicting "no trip" for every hour. What\'s the most direct fix, given what this lesson covered?',
      'choices': [
        'Switch reduction from mean to sum so rare events contribute more',
        'Apply a pos_weight to the positive (trip) class so its errors count more in the loss',
        'Switch from BCE to MSE, since MSE handles imbalance natively',
        'Increase the batch size until peak-trip hours appear more often'
      ],
      'correct': 1,
      'explain': 'A pos_weight (often set to the negative:positive ratio, here roughly 32) scales up the loss contribution of true peak-trip hours, so the model can no longer get a low loss just by always predicting "no trip." (A) is a distractor because switching mean to sum rescales the whole loss uniformly — it doesn\'t change the relative weight between classes at all, so the imbalance problem is untouched.'
    }
  ],
  'course-1-deep-learning/unit3': [
    {
      'stem': 'A ZIP-code classifier has one scalar cross-entropy loss as output and roughly 40,000 weights as inputs to differentiate with respect to. Why does reverse-mode automatic differentiation (backpropagation) beat forward-mode here?',
      'choices': [
        'Forward-mode cannot represent nonlinear operations like ReLU or softmax.',
        'Reverse-mode cost scales with the number of outputs (one loss), so a single backward pass yields the full gradient; forward-mode cost scales with the number of ',
        'Reverse-mode uses less memory because it never caches forward activations.',
        'Forward-mode only works for convolutional networks, not fully connected ones.'
      ],
      'correct': 1,
      'explain': 'Reverse-mode\'s cost is proportional to the number of outputs, and there is exactly one — the scalar loss — so one backward pass produces every weight\'s gradient at once. Forward-mode\'s cost is proportional to the number of inputs, so it would need one pass per weight, roughly 40,000 forward-mode passes to match a single backward pass. A is wrong — both modes handle nonlinear operations fine, they just differ in bookk'
    },
    {
      'stem': 'Fill in the missing line so this ReLU backward step matches the derivation from Lesson 2, given cached pre-activation z1 and incoming gradient dh .',
      'choices': [
        'dh * (z1 > 0)',
        'dh * z1',
        'np.maximum(dh, 0)',
        'dh / z1'
      ],
      'correct': 0,
      'explain': 'ReLU\'s local gradient is 1 where the cached pre-activation was positive and 0 otherwise; multiplying the incoming gradient by that boolean mask zeroes out exactly the units that were inactive on the forward pass. C is the tempting distractor because np.maximum(x, 0) is the forward-pass ReLU formula itself — applying it to the gradient dh during the backward pass is a category error, clamping the gradient\'s sign rathe'
    },
    {
      'stem': 'This training loop trains noticeably worse than expected across many runs, even at a reasonable learning rate. Find the bug.',
      'choices': [
        'The learning rate is applied inside the loop instead of after it.',
        'There is no shuffling — every epoch slices the same fixed contiguous blocks of X and Y in the same order, so if the data is sorted or grouped by digit, batches ',
        'cross_entropy is called before backward , which is the wrong order.',
        'The gradients should be added to the parameters, not subtracted.'
      ],
      'correct': 1,
      'explain': 'The loop always takes contiguous slices of X and Y in the same fixed order every epoch. If the underlying ZIP-code data was collected or stored grouped by digit (all 0s, then all 1s, and so on — a realistic scenario for scanned batches from a single sorting run), every mini-batch is systematically unrepresentative, and the same skewed batches repeat epoch after epoch, biasing the gradient estimate. The fix is to shuf'
    },
    {
      'stem': 'A sorting facility needs to retrain its digit classifier overnight on 500,000 labeled crops using a single GPU built for vectorized matrix operations. Which gradient descent variant fits best, and why?',
      'choices': [
        'Batch gradient descent, because it produces the most accurate gradient every step.',
        'Single-example stochastic gradient descent, because it takes the most update steps per epoch.',
        'Mini-batch gradient descent with a batch size like 128 or 256, because it keeps gradient noise moderate while matching the GPU\'s vectorized throughput.',
        'It does not matter, since all three variants take the same total wall-clock time for a fixed number of epochs.'
      ],
      'correct': 2,
      'explain': 'Mini-batches sized to match the GPU\'s parallel width get far more updates per pass over the data than full-batch descent, while producing a much less noisy gradient estimate than single-example SGD, and they use the hardware the way it was built to be used. A is wrong in practice at this scale — one update per 500,000 examples means almost no progress per unit of wall-clock time, even though each individual gradient '
    },
    {
      'stem': 'Training the same two-layer ZIP-code classifier for five epochs at three different learning rates produces these loss traces (starting near ln(10) ≈ 2.30 , the loss of guessing uniformly among 10 digits): Run 1: [2.30, 1.44, 0.97, 0.71, 0.55] Run 2: [2.31, 4.02, 19.87, nan, nan] Run 3: [2.30, 2.29, 2.28, 2.27, 2.26] Which run used a learn',
      'choices': [
        'Run 1',
        'Run 2',
        'Run 3',
        'None — all three are healthy, just at different speeds.'
      ],
      'correct': 1,
      'explain': 'The loss grows rather than shrinks and reaches nan within a few epochs — the signature of a learning rate large enough that each update overshoots the loss surface\'s curvature and the weights diverge. Run 1 is the healthy run — steady, substantial decrease each epoch. Run 3 is not "healthy but slow," it is diagnostically a crawl: the loss barely moves off its random-guessing starting point after five full epochs, mea'
    }
  ],
  'course-1-deep-learning/unit4': [
    {
      'stem': 'You\'re training a quadruped locomotion policy with the plain SGD update from Unit 3. The loss curve oscillates sharply step to step and only trends down very slowly over 2,000 steps. A quick diagonal-curvature estimate puts the condition number around 200. What should you try first?',
      'choices': [
        'Raise the learning rate so the oscillation resolves faster.',
        'Add classical momentum (β≈0.9) so alternating-sign gradients along the steep direction cancel while the consistent shallow-direction signal accumulates.',
        'Increase the batch size and change nothing else about the update rule.',
        'Add weight decay to shrink the oscillating parameters.'
      ],
      'correct': 1,
      'explain': 'A high condition number with oscillation-and-slow-progress is exactly the ravine pattern from Lesson 1 — momentum\'s velocity buffer cancels the alternating-sign steep-direction gradients and accumulates the consistent shallow-direction signal. A is the tempting-but-wrong move: raising lr in an already ill-conditioned bowl pushes the steep direction closer to its stability limit 2/λ_max , making the oscillation worse,'
    },
    {
      'stem': 'A 7-DOF arm\'s grasp policy has a fingertip force-sensor feature that fires on about 2% of timesteps early in training, while joint-angle features update every step. Plain SGD with a single learning rate either destabilizes the joint-angle weights or leaves the contact weights barely trained. Which change addresses this specific mismatch?',
      'choices': [
        'Switch to Nesterov momentum instead of classical momentum.',
        'Switch to an adaptive method (RMSProp or Adam) that scales each parameter\'s effective learning rate by its own accumulated gradient statistics.',
        'Lower the global learning rate until the joint-angle weights stop diverging.',
        'Increase the rollout batch size so the contact feature fires more often.'
      ],
      'correct': 1,
      'explain': 'This is precisely the problem Lesson 2 opens with: features that fire at very different rates need per-parameter learning rate scaling, which momentum alone does not provide — momentum changes how gradients over time are combined, but still applies one shared learning rate to every parameter. C is the tempting distractor: lowering the global rate does stop the joint-angle weights from diverging, but it makes the cont'
    },
    {
      'stem': 'A teammate\'s Adam implementation is producing wildly oversized updates in the first ~10 steps of a grasping-policy run, before settling down. Find the bug.',
      'choices': [
        'The learning rate default of 1e-3 is too high for a robotics policy.',
        'Bias correction (dividing m and v by 1-b1**t and 1-b2**t ) is missing, so early steps use raw moment estimates that understate the true gradient by very differe',
        'eps should be added inside the square root, not outside it.',
        'The squared gradient should use abs(g) instead of g ** 2 .'
      ],
      'correct': 1,
      'explain': 'Without correction, m at step 1 is only (1-b1)=10% of the true gradient while v at step 1 is only (1-b2)=0.1% of the true squared gradient — the numerator and denominator are biased by very different factors, so the ratio m/√v is arbitrarily mis-scaled for the first several steps until both EMAs "warm up," matching the reported symptom exactly. A is a real tuning consideration for robotics in general (Lesson 2 recomm'
    },
    {
      'stem': 'Complete the one-line change that turns this Adam step into AdamW (decoupled weight decay), given weight decay coefficient wd .',
      'choices': [
        'w = w - lr * wd * m_hat',
        'w = w - lr * wd * w',
        'g = g + wd * w (added before computing m and v )',
        'w = w * (1 - wd) (applied once, before training starts)'
      ],
      'correct': 1,
      'explain': 'AdamW applies decay directly to the weight, outside the √v_hat denominator entirely — that\'s the decoupling. C is the tempting distractor because it looks like ordinary L2 regularization, and it is — but that\'s precisely the coupled version Lesson 2 says AdamW moves away from: folding decay into g means it gets divided by √v_hat along with the rest of the gradient, so frequently-updated parameters are decayed less th'
    },
    {
      'stem': 'You scale up a quadruped training run from 512 to 2,048 parallel simulated robot instances (4x the batch size), keeping total sample budget roughly fixed. You apply the linear scaling rule and raise the peak learning rate 4x to match, but leave the warmup length exactly as it was on the smaller run. Within the first few hundred steps, sev',
      'choices': [
        'The warmup length should have been extended roughly in proportion to the peak learning rate — a 4x larger peak step needs proportionally longer to ramp in, so t',
        'Larger batches always destabilize training regardless of learning rate, so the fix is to reduce the batch size back down.',
        'The problem is unrelated to batch size; switch optimizers from Adam to plain SGD.',
        'Increase β2 in Adam to 0.9999 to fix the instability.'
      ],
      'correct': 0,
      'explain': 'Scaling peak lr with batch size was the right call — but the linear scaling rule has a second half: warmup has to lengthen in proportion too. Warmup exists because early gradients are large, noisy, and badly scaled, and a 4x larger peak step makes that early window more dangerous, not less. Holding warmup fixed means the run hits a 4x larger lr at the same early step it used to hit the old one, which is exactly the u'
    },
    {
      'stem': 'Your team is training a grasping policy on a shared cluster where the actual number of steps you\'ll get is uncertain — your allocation can be reclaimed at any time. The eval metric (average return on a fixed sim-eval suite) is also fairly noisy run to run. Which schedule fits this situation best?',
      'choices': [
        'Cosine annealing over an assumed total budget of 200k steps.',
        'One-cycle spanning an assumed total budget of 200k steps.',
        'ReduceLROnPlateau, monitoring eval return with a patience window, since no schedule that assumes a fixed total-step horizon fits an unknown, revocable budget.',
        'Step decay at fixed milestones of 50k/100k/150k steps.'
      ],
      'correct': 2,
      'explain': 'Both cosine and one-cycle bake a fixed horizon into the curve; if the run ends early (allocation reclaimed) the decay never completes as planned, and if it ends via a warm-restart-style scheme mid-restart, it\'s stranded with lr pushed back up and no time left to bring it down. Plateau-based scheduling makes no assumption about total steps and reacts directly to whether the (admittedly noisy) eval metric is still impr'
    }
  ],
  'course-1-deep-learning/unit5': [
    {
      'stem': 'Your delinquency model\'s training loss falls steadily through epoch 40, but validation AUC peaks at 0.781 on epoch 6 and drifts down to 0.760 by epoch 30. The train/val gap widens steadily after epoch 6. Which is the most appropriate first thing to try?',
      'choices': [
        'Increase the learning rate so the network reaches its best epoch sooner.',
        'Add or increase weight decay (and/or introduce early stopping) to control capacity.',
        'Remove batch normalization, since the drift must be caused by internal covariate shift.',
        'Switch the loss function from cross-entropy to mean squared error.'
      ],
      'correct': 1,
      'explain': 'Falling train loss with a validation metric that peaks and then reverses is the textbook signature of overfitting/variance — the fix is to constrain effective capacity, via a weight penalty, dropout, or stopping training at the good epoch. Option C is a tempting distractor because "internal covariate shift" sounds like the right vocabulary, but the term describes a (largely disproven) explanation for why batch norm h'
    },
    {
      'stem': 'A team addresses their 2% positive rate by applying SMOTE to oversample synthetic delinquent applicants before training. During model review, an auditor objects. Which objection is most directly supported by how SMOTE works?',
      'choices': [
        'SMOTE can produce synthetic applicants whose interpolated bureau-attribute combinations don\'t correspond to any real applicant, and does nothing to correct for ',
        'SMOTE always reduces the model\'s validation AUC, so it should never be used with imbalanced data.',
        'SMOTE requires the labels to be smoothed before oversampling, which this team skipped.',
        'SMOTE can only be applied to categorical features, so it doesn\'t work on bureau data at all.'
      ],
      'correct': 0,
      'explain': 'SMOTE interpolates between real minority-class neighbors in feature space to create synthetic rows; those interpolated feature combinations may not represent any realizable applicant, and since SMOTE only resamples structure already present in the training vintage, it provides no protection against — and can even reinforce sensitivity to — the training/scoring vintage shift. Option B overstates the case (SMOTE can he'
    },
    {
      'stem': 'A team applies label smoothing with ε = 0.3 to their credit model, whose true positive rate is 2%. What is the most likely effect on the portfolio\'s average predicted probability of default?',
      'choices': [
        'No effect — label smoothing only changes gradients early in training, not final predictions.',
        'The average predicted probability will be systematically inflated well above the true 2% base rate, because the softened negative-class target (0.15) is far abo',
        'The average predicted probability will be systematically deflated below 2%.',
        'Predictions become perfectly calibrated, since label smoothing is specifically designed to fix calibration.'
      ],
      'correct': 1,
      'explain': 'With ε = 0.3, a true-negative target of 0 becomes 0.15. Since 98% of rows are true negatives, the model is trained to output roughly 0.15 for the vast majority of applicants — over 7x the true 2% base rate — which will visibly inflate the portfolio\'s average predicted probability of default. Option D is the tempting distractor: label smoothing does curb overconfidence, but "curbing overconfidence" and "being well cal'
    },
    {
      'stem': 'A model-risk analyst wants to select early-stopping\'s patience and min_delta by trying a few values and picking whichever gives the highest AUC on the out-of-time test set reserved for the final regulatory sign-off. What is wrong with this plan?',
      'choices': [
        'Nothing — early stopping doesn\'t count as a hyperparameter, so it\'s fine to tune against the test set.',
        'It leaks the test set into model selection, the same way tuning learning rate or lambda on it would; the final reported AUC becomes an optimistic estimate of de',
        'Patience and min_delta have no effect on AUC, so the exercise is pointless but harmless.',
        'Early stopping should always use patience=1, so no tuning is needed either way.'
      ],
      'correct': 1,
      'explain': 'The stopping epoch is chosen by watching a validation metric — exactly the same kind of decision as choosing a learning rate or a weight-decay value. Making that choice by repeatedly checking the out-of-time test set turns that set into a de facto validation set, and whatever AUC it reports afterward is no longer an unbiased estimate of how the model will perform once deployed. Option A is the tempting distractor bec'
    }
  ],
  'course-1-deep-learning/unit6': [
    {
      'stem': 'A wheat-rust pustule cluster sits near the top-left of one field photo, and the same cluster (same lighting, same crop) sits 20 pixels further right in a second photo taken from a slightly different angle. Which best describes what a single 3×3 conv layer, with no pooling or stride, does across these two photos?',
      'choices': [
        'The output feature map is identical in both cases, because the kernel\'s weights are shared across positions.',
        'The activation pattern for the pustule shifts by roughly 20 pixels in the output feature map, but its shape and strength are otherwise the same — translation eq',
        'The layer fails to detect the pustule in the second photo, since its weights were learned around the first photo\'s position.',
        'The layer becomes fully translation-invariant after this one pass, so no further pooling is needed downstream.'
      ],
      'correct': 1,
      'explain': 'Weight sharing means the same kernel is tried at every position, so wherever the pustule pattern appears, the kernel fires — but the firing shows up at the corresponding shifted location in the output map. That relocation-but-preserved-form behavior is exactly what "translation equivariant" means. A is the tempting wrong answer: it confuses weight sharing (same weights applied everywhere) with invariance (same output'
    },
    {
      'stem': 'Fill in the missing line so this receptive-field tracker matches the formula from Lesson 2 ( RF_out = RF_in + (K−1)·jump_in , jump_out = jump_in · S ):',
      'choices': [
        'rf_in + (K - 1) * jump_in',
        'rf_in * K * S',
        'rf_in + K * jump_in',
        '(rf_in + K - 1) * S'
      ],
      'correct': 0,
      'explain': 'Each additional kernel element beyond the first ( K − 1 of them) extends the receptive field outward by however many original-image pixels one step at the current layer corresponds to ( jump_in ) — that\'s exactly rf_in + (K - 1) * jump_in . Option C is the tempting distractor: it uses the full kernel size K instead of K − 1 , which double-counts the first kernel element\'s contribution (it\'s already included in rf_in '
    },
    {
      'stem': 'A conv layer takes a 112×112×64 feature map as input and applies 128 filters of size 3×3, with a bias per output channel. How many learnable parameters does this layer have?',
      'choices': [
        '9,216',
        '73,728',
        '73,856',
        '1,048,576'
      ],
      'correct': 2,
      'explain': 'Parameters = K·K·C_in·C_out + C_out = 3·3·64·128 + 128 = 73,728 + 128 = 73,856. The 112×112 spatial size is irrelevant to the parameter count — the same 73,856 numbers get reused at every one of the roughly 12,544 output positions. B (73,728) is the tempting distractor: it\'s the weight count alone, forgetting the + C_out bias term — an easy one-line omission when computing this by hand. A (9,216 = 3·3·64·16, an unrel'
    },
    {
      'stem': 'This block is meant to take a 64-channel feature map in and produce a 128-channel feature map out, matching the pattern from Lesson 3. Running it raises: RuntimeError: running_mean should contain 64 elements not 128 . Find and fix the bug.',
      'choices': [
        'Change nn.BatchNorm2d(c_in) to nn.BatchNorm2d(c_out) — BatchNorm normalizes the conv\'s output, which has c_out channels, not the conv\'s input.',
        'Change kernel_size=3 to kernel_size=1 — the kernel size is causing the channel mismatch.',
        'Remove bias=False from the Conv2d call — the missing bias is what\'s breaking BatchNorm.',
        'Swap the order of Conv2d and BatchNorm2d so BatchNorm runs first.'
      ],
      'correct': 0,
      'explain': 'BatchNorm2d\'s argument is the number of channels it will receive , and it receives whatever the previous layer output — here, the Conv2d\'s c_out channels. Writing BatchNorm2d(c_in) configures it to expect the conv\'s input channel count instead, so its internal running-mean/running-variance buffers are sized for 64 channels when a 128-channel tensor actually arrives. C is the tempting distractor because bias=False loo'
    },
    {
      'stem': 'Why have many modern CNN designs replaced max-pooling with stride-2 convolutions for downsampling?',
      'choices': [
        'Because pooling layers have far more parameters than a strided conv, so removing them shrinks the model.',
        'Because a strided conv can learn which combination of input values to preserve while downsampling, instead of always applying a fixed max/average rule.',
        'Because pooling layers cannot change the spatial resolution of a feature map at all.',
        'Because strided convolutions are translation-invariant while pooling layers are not.'
      ],
      'correct': 1,
      'explain': 'Pooling applies the same non-learned rule (max or average) everywhere; a stride-2 conv has learnable weights, so the network can decide what\'s worth keeping as it downsamples, at the cost of added parameters and compute versus pooling. A is backwards and is the tempting distractor: pooling has zero learnable parameters, not more than a conv — replacing pooling with a strided conv adds parameters, it doesn\'t remove th'
    }
  ],
  'course-1-deep-learning/unit7': [
    {
      'stem': 'A vanilla RNN trained on 9-day ICU stays fails to learn that a lactate value from day 1 predicts sepsis onset on day 9, even though the training data clearly contains that pattern. Which single change is most directly responsible for fixing this, and why?',
      'choices': [
        'Increase the hidden state size so it can store more information.',
        'Switch to an LSTM, whose additive cell-state update avoids the repeated multiplication by W_hh that causes the day-1 gradient to vanish by day 9.',
        'Add gradient clipping so the exploding gradient stops overwhelming the day-1 signal.',
        'Shrink the truncated-BPTT chunk size so the network sees day 1 more often.'
      ],
      'correct': 1,
      'explain': 'The described symptom — long-range signal that exists in the data but can\'t be learned — is the classic vanishing-gradient signature from Lesson 1, driven by repeated multiplication by W_hh over ~200 timesteps. The LSTM\'s additive cell-state path ( c_t = f_t⊙c_{t-1} + i_t⊙c̃_t ) is specifically what removes that repeated-multiplication decay. A is a tempting distractor because more capacity sounds like it should help'
    },
    {
      'stem': 'A colleague proposes using a bidirectional LSTM for the 6-hour-ahead sepsis prediction task, arguing that it consistently scores higher AUROC on the held-out test set than the unidirectional version. What is the correct response?',
      'choices': [
        'Adopt it — a higher AUROC on held-out data is the definitive measure of model quality, regardless of architecture.',
        'Reject it — the backward pass in a bidirectional model requires vitals from after each prediction point, meaning the reported AUROC reflects the model seeing th',
        'Adopt it, but only for retrospective research use, since the concern is purely about training speed, not validity.',
        'Reject it only if the forward and backward hidden states are concatenated rather than averaged.'
      ],
      'correct': 1,
      'explain': 'This is exactly the trap named in Lesson 3: a bidirectional model\'s higher score is not evidence of better modeling, it\'s evidence of information leakage, because the backward recurrence at hour t has already processed vitals from hours after t — data that would not exist yet at real deployment time. The "hard requirement that the model never peek at the future" makes this a correctness violation, not a modeling choi'
    },
    {
      'stem': 'This masked loss function is intended to ignore padded ICU timesteps, and it passes a quick sanity check where every sequence in the batch has the same true length. It silently gives wrong (scaled-down) loss values on any batch with sequences of mixed length. Find the bug.',
      'choices': [
        'The masking multiplication itself ( per_step * mask ) is wrong and should be a division.',
        'The normalization divides by batch_size × T (the padded shape) instead of mask.sum() (the actual count of real timesteps), so the whole loss is scaled down by t',
        'np.clip should not be applied before masking.',
        'The bug is in the sign of the log terms.'
      ],
      'correct': 1,
      'explain': 'The numerator correctly zeroes out padded terms via per_step * mask , but the denominator still uses the full padded shape ( batch_size × T ) instead of mask.sum() , the true number of real timesteps. On a uniform-length batch, mask.sum() == batch_size × T , so the bug is invisible — which is exactly why it survives a same-length sanity check. On a mixed-length batch, the numerator sums over real timesteps only while'
    },
    {
      'stem': 'A 20-minute-old admission has no lactate draw yet. Which encoding of that missing lactate channel best follows the practice recommended in Lesson 3?',
      'choices': [
        'Set lactate to 0 for that timestep; zero is a safe neutral default for an unobserved lab value.',
        'Set lactate to the population mean lactate value, so the input distribution stays centered.',
        'Include a missingness flag for the lactate channel plus a time-since-last-observed feature, and leave the raw value however the pipeline naturally represents "n',
        'Drop the lactate channel from the model entirely for patients without an early draw.'
      ],
      'correct': 2,
      'explain': 'Lesson 3 is explicit that zero-fill (A) and mean-fill (B) are both a form of the same mistake: they hand the network a plausible-looking number with no way to distinguish "this is the true value" from "this was never measured," which risks teaching the model a spurious relationship with whatever fill value was chosen. A mask-plus-delta encoding preserves the distinction and lets the network learn how much to trust a '
    },
    {
      'stem': 'You\'re truncating a 9-day ICU stay into 24-hour chunks for training and want the LSTM\'s memory to span the whole stay, not reset every 24 hours. Complete the missing step between processing chunk k and chunk k+1 for the same patient.',
      'choices': [
        'Reset h, c = np.zeros(...), np.zeros(...) before the next chunk.',
        'Detach h and c from the computation graph (stop gradient tracking) but keep their numerical values to carry into the next chunk.',
        'Discard h and c and instead re-run the LSTM from the start of the stay for every chunk.',
        'Average h and c with their initial zero values before continuing.'
      ],
      'correct': 1,
      'explain': 'This is stateful truncation: carrying the hidden and cell state\'s values forward preserves the memory of the whole stay across chunk boundaries, while detaching them from the graph is what keeps memory bounded to one chunk\'s worth of stored activations — you get the long-range memory without paying for 216 timesteps of stored backward-pass activations at once. A is stateless truncation, which is exactly what discards'
    }
  ],
  'course-1-deep-learning/unit8': [
    {
      'stem': 'A 3-D facies classifier over 12 lithology classes reports a training loss of 2.485, completely flat, for the first 30 epochs. What does this number, by itself, most strongly suggest?',
      'choices': [
        'The learning rate is too high and is causing divergence.',
        '-ln(1/12) ≈ 2.485 — the model is outputting a uniform distribution and has learned nothing since initialization.',
        'The model has converged to a sharp local minimum.',
        'Batch normalization statistics are leaking from validation into training.'
      ],
      'correct': 1,
      'explain': 'ln(12) ≈ 2.485 is exactly the cross-entropy loss of a uniform 12-class prediction. A flat loss sitting at that value for 30 epochs means no learning signal is reaching the parameters at all — the next step is the overfit-one-batch test, not a hyperparameter change. A is wrong because divergence from too-high LR produces a loss that increases or oscillates, not one that sits flat at exactly ln(num_classes) — a divergi'
    },
    {
      'stem': 'Overfitting a single batch to near-zero loss proves the full-scale training run, on the terabyte-scale seismic cube, will also converge well.',
      'choices': [
        'True',
        'False'
      ],
      'correct': 1,
      'explain': 'Overfitting one batch only rules out bugs in the forward pass, loss computation, and label pipeline — it says nothing about whether the model generalizes, whether the learning rate and regularization are right at scale, or whether the data loader can keep up. It\'s a necessary early check, not a sufficient one. The tempting reasoning is "if it can learn at all, it will learn well" — but capacity, regularization streng'
    },
    {
      'stem': 'Your team ran an ASHA sweep and found config B beats config A by 0.3% validation accuracy on one seed each. What is the correct next step before reporting config B as the winner to the client?',
      'choices': [
        'Ship config B immediately — 0.3% is a real, reportable improvement.',
        'Re-run config B on the held-out test set to confirm the gain.',
        'Re-run both configs A and B across several more seeds to check whether 0.3% exceeds normal run-to-run variance.',
        'Increase the ASHA keep-fraction and rerun the whole sweep.'
      ],
      'correct': 2,
      'explain': 'A single-seed 0.3% gap is well within the seed-variance range commonly seen on segmentation-style models (roughly 0.2–0.5 points). Multiple seeds per candidate are needed before treating a small gap as a genuine effect rather than noise. B is the second trap this lesson warns about: touching the test set during model selection — even just to "confirm" a winner before the final report — contaminates it, so any test-se'
    },
    {
      'stem': 'Complete the missing line so this ASHA-style loop actually discards the worse-performing configurations at each rung (lower validation loss is better).',
      'choices': [
        'scored.sort(key=lambda pair: pair[1])',
        'scored.sort(key=lambda pair: pair[1], reverse=True)',
        'random.shuffle(scored)',
        'scored.sort(key=lambda pair: pair[0])'
      ],
      'correct': 0,
      'explain': 'Sorting ascending by validation loss ( pair[1] ) puts the best (lowest-loss) configs first, so slicing scored[:n_keep] keeps the survivors, exactly matching ASHA\'s early-kill rule. B sorts descending and would keep the worst configs after the same slice — the opposite of successive halving. D sorts by the config dict itself ( pair[0] ), which has no defined ordering and wouldn\'t reflect performance at all.'
    },
    {
      'stem': 'A 60M-parameter 3-D segmentation model is trained with Adam in fp32. Roughly how does the combined memory of gradients plus Adam\'s optimizer state compare to the memory used by the parameters alone?',
      'choices': [
        'About the same (1×) — gradients and optimizer state are negligible.',
        'About 3× the parameter memory (1× gradients + 2× moment buffers).',
        'About 0.5× the parameter memory — Adam is more memory-efficient than plain SGD.',
        'It depends only on batch size, not on the optimizer.'
      ],
      'correct': 1,
      'explain': 'Gradients match parameter size (1×), and Adam keeps two parameter-shaped moment buffers, m and v (2×), for 3× the parameter memory in gradients and optimizer state combined — 4× total once parameters themselves are counted. C is backwards: Adam costs more memory than plain SGD (which only needs one momentum buffer, if any), not less — that\'s the direct tradeoff for Adam\'s per-parameter adaptive learning rates. D is w'
    },
    {
      'stem': 'This training loop for the facies model reports a suspiciously low validation loss during training, but real-world inference on new survey data is much worse than that validation number predicted. Identify the bug and state the fix. (This question deliberately combines the debugging protocol from Lesson 1 with the batch-norm behavior cove',
      'choices': [
        'The optimizer step is called before the backward pass.',
        'The model is never switched to model.eval() before validation, so batch norm keeps using per-batch statistics and dropout stays active, both of which flatter va',
        'The loss function reduction is set to sum instead of mean .',
        'torch.no_grad() should not be used during validation.'
      ],
      'correct': 1,
      'explain': 'The loop never calls model.eval() before the validation pass, so batch-norm layers keep normalizing with each validation batch\'s own statistics instead of the accumulated running mean/variance from training, and dropout keeps randomly zeroing activations — both make validation numbers look artificially close to (or sometimes better than) they\'ll be at real inference time, where eval() mode is correctly used. The fix '
    },
    {
      'stem': 'A 3-D CNN training job on the shared cluster shows GPU utilization sitting at 22% throughout training, even though a quick profiling run confirms the forward and backward passes are fast. What is the most likely fix, and why doesn\'t switching to mixed precision address it?',
      'choices': [
        'Switch to bf16 — it will reduce activation memory and raise utilization.',
        'Add more dataloader worker processes and prefetch/cache decoded sub-volumes — the GPU is idle waiting on data, which mixed precision does nothing to fix since i',
        'Increase the learning rate so each step makes more progress per batch.',
        'Switch from data parallelism to model parallelism to spread the I/O load.'
      ],
      'correct': 1,
      'explain': 'Low GPU utilization with a fast forward/backward pass is the signature of a data-loader bottleneck: the GPU finishes each step quickly and then sits idle waiting for the next batch of multi-gigabyte seismic sub-volumes to be read and preprocessed off shared storage. More worker processes, prefetching, and local caching address the actual bottleneck; mixed precision only speeds up on-device compute and shrinks on-devi'
    }
  ],
  'course-2-foundational-models/unit1': [
    {
      'stem': 'Which of the following is the property that most specifically distinguishes a "foundation model" from merely "a large model trained on a lot of data"?',
      'choices': [
        'It has more parameters than any prior model in its domain.',
        'Its training run required more GPU-hours than any prior model.',
        'Its internal representation is general enough to be useful for downstream tasks it never saw during training.',
        'It was trained using a transformer architecture rather than an LSTM.'
      ],
      'correct': 2,
      'explain': 'Scale and self-supervision are common ingredients, but the property that actually earns the name "foundational" is that the representation transfers to tasks the model was never trained on — a large model optimized end-to-end for one narrow task fails this even at huge scale. A and B describe scale alone, which Lesson 1 explicitly says is necessary but not sufficient — a large single-task model isn\'t foundational. D '
    },
    {
      'stem': 'Which pair of numbers correctly illustrates why supervised learning alone is "dead on arrival" for protein structure modeling?',
      'choices': [
        '~60M sequences in UniRef50 vs. ~200k solved structures in the PDB.',
        '~20 amino acid types vs. ~60M sequences in UniRef50.',
        '650M parameters in one ESM-2 checkpoint vs. 3B parameters in a larger one.',
        '15% masking rate vs. 400 labelled examples used for a linear probe.'
      ],
      'correct': 0,
      'explain': 'This is the ratio from Lesson 3: roughly 0.3% of sequences carry a solved-structure label, so a purely supervised approach would discard over 99.7% of the corpus. B, C, and D are all real numbers from the unit but answer different questions — B compares alphabet size to corpus size (unrelated to label scarcity), C compares two checkpoint sizes (an adaptation-cost trade-off, Lesson 2), and D describes the masking func'
    },
    {
      'stem': 'A lab freezes a pretrained ESM-2 encoder, embeds 400 labelled sequences once, caches the vectors, and trains only a logistic regression head on those vectors. Which adaptation strategy from Lesson 2\'s menu is this?',
      'choices': [
        'Full fine-tuning',
        'Prompting',
        'Parameter-efficient fine-tuning (PEFT)',
        'Linear probing / feature extraction'
      ],
      'correct': 3,
      'explain': 'This is the defining pattern of linear probing: the encoder\'s weights are frozen and never receive a gradient; only a small classifier trained on top of cached, fixed embeddings updates. Full fine-tuning (A) would update the encoder\'s own weights, not just a head. PEFT (C) would insert new trainable parameters into the frozen network rather than relying purely on a separate external head. Prompting (B) would not invo'
    },
    {
      'stem': 'Complete the missing line so that mask_sequence correctly records the ORIGINAL residue as the label before overwriting it in the corrupted copy.',
      'choices': [
        'targets[i] = residue',
        'targets[i] = MASK_TOKEN',
        'corrupted[i] = residue',
        'targets[residue] = i'
      ],
      'correct': 0,
      'explain': 'The label at each masked position must be the true residue that was there before corruption — that\'s the "free label" the pretext task manufactures. This line must run before the residue is overwritten in corrupted . B stores the mask token as the target, which would make the task trivially unlearnable (predicting a constant). C corrupts nothing, defeating the pretext task entirely. D swaps key and value, which would'
    },
    {
      'stem': 'A colleague adapts the frozen-encoder example from Lesson 2 but reports the logistic head barely trains. Here is their code — spot the bug.',
      'choices': [
        'The bug is in LogisticRegression : it should use a linear activation, not logistic.',
        'The bug is that encoder.eval() was never called and the encoder\'s parameters were never frozen with requires_grad = False , and the forward pass isn\'t wrapped i',
        'The bug is that mean(dim=1) should be sum(dim=1) to pool residue embeddings correctly.',
        'The bug is that 400 examples is too few to ever train any model, regardless of setup.'
      ],
      'correct': 1,
      'explain': 'Lesson 2\'s version explicitly calls encoder.eval() , sets every parameter\'s requires_grad = False , and wraps the forward pass in a no-grad context. Without those three things, this is not linear probing at all — it\'s an (accidental, incomplete) attempt at full fine-tuning, with the encoder left in training mode and gradient tracking on, which changes memory cost and behavior (e.g. dropout stays active) even though t'
    },
    {
      'stem': 'Which scenario best describes "shortcut learning" during protein pretraining, as distinct from a pretext task simply being too easy?',
      'choices': [
        'The model achieves low masked-residue prediction loss by recognizing near-duplicate sequence families in an under-deduplicated corpus and copying typical residu',
        'The model achieves high loss on the pretext task because the masking rate was set too high for the sequence length.',
        'The model is evaluated with a k-NN probe and scores poorly because the reference set is too small.',
        'The model\'s pretraining run runs out of compute budget before convergence.'
      ],
      'correct': 0,
      'explain': 'This is the exact shortcut-learning example from Lesson 3: a superficial regularity (near-duplicate families) lets the model report good pretext-task loss while learning something shallower than the intended structural reasoning — the reported metric looks fine, which is precisely what makes shortcut learning dangerous. B describes a task made too hard by a hyperparameter choice, not a shortcut. C is a probing-method'
    }
  ],
  'course-2-foundational-models/unit2': [
    {
      'stem': 'Why does a transformer layer learn three separate projections (query, key, value) instead of reusing one projected vector for all three roles?',
      'choices': [
        'Three projections are required so the layer has more trainable parameters, which always improves quality.',
        'Query, key, and value play conflicting roles for the same token — asking, being matched against, and supplying content — and one shared geometry can\'t optimize ',
        'It\'s purely a historical convention from the original paper with no functional benefit; a single shared projection produces identical results.',
        'Separate projections are needed only to allow multi-head attention; single-head attention needs just one projection.'
      ],
      'correct': 1,
      'explain': 'A query encodes what a token is looking for, a key encodes how a token advertises itself for matching, and a value is the content actually copied forward once a match is found. These are different jobs with different natural geometries, so a single vector reused for all three would force a compromise between them. A is wrong because parameter count isn\'t the reason — the three projections exist for a functional, not '
    },
    {
      'stem': 'Why did pre-LN (normalizing a sub-layer\'s input before it runs, x + sublayer(LayerNorm(x)) ) become the default over post-LN ( LayerNorm(x + sublayer(x)) ) for very deep transformer stacks?',
      'choices': [
        'Pre-LN keeps the residual stream itself free of normalization, so the identity path through many stacked blocks stays linear and gradients don\'t have to pass th',
        'Pre-LN uses fewer parameters than post-LN, since it only normalizes half as often.',
        'Post-LN was discovered to be mathematically identical to pre-LN, so the switch was purely about code readability.',
        'Pre-LN removes the need for residual connections entirely, simplifying deep stacks.'
      ],
      'correct': 0,
      'explain': 'In post-LN, the normalization sits directly in the residual path, so the "clean" identity shortcut isn\'t actually clean — every block adds a normalization the gradient must pass through. Pre-LN normalizes only the sub-layer\'s input, leaving x + sublayer(...) as a true, unobstructed identity path, which is what made very deep (dozens of blocks) stacks trainable without careful warmup. B is wrong — both apply the same '
    },
    {
      'stem': 'A legal-tech team needs a model that reads all 400 clauses of a contract at once and outputs a binary label per clause — "creates an indemnification obligation" or not — with the full document available up front. Which architecture family fits best, and why?',
      'choices': [
        'Decoder-only, because causal masking is required for any classification task.',
        'Encoder-decoder, because the task has a separate input and output.',
        'Encoder-only, because the whole document is available at once and the task needs rich bidirectional context per clause, not text generation.',
        'None of the three families apply; classification requires a separate non-transformer architecture.'
      ],
      'correct': 2,
      'explain': 'Clause classification over an already-complete document benefits from every clause attending bidirectionally to every other clause — there\'s no "future" to hide, since nothing is being generated left to right. That\'s exactly the encoder-only setup (BERT-style), which produces per-token or per-clause representations for a downstream classifier head. A is backwards — causal masking is for generation, where future token'
    }
  ],
  'course-2-foundational-models/unit3': [
    {
      'stem': 'A whitespace tokenizer is run over the Japanese title "洗濯機用ステンレスホース" (no spaces in the original). What is the most likely outcome?',
      'choices': [
        'The title splits cleanly into individual words.',
        'The entire title becomes a single token, since there is no whitespace to split on.',
        'The tokenizer throws an error because Japanese uses a non-Latin script.',
        'The title is automatically transliterated to Latin script before splitting.'
      ],
      'correct': 1,
      'explain': 'Whitespace tokenization can only split where whitespace exists. Japanese doesn\'t use whitespace between words, so the whole string is treated as one indivisible token — exactly the failure mode Lesson 1 opens with. Option A is the tempting distractor because it assumes the tokenizer has some awareness of word boundaries — it doesn\'t; whitespace splitting has no model of language, only of the space character. Options '
    },
    {
      'stem': 'Byte-Pair Encoding was originally published in 1994 as a general-purpose algorithm, and was repurposed for neural machine translation by Sennrich et al. in 2016.',
      'choices': [
        'encryption',
        'compression',
        'parsing',
        'hashing'
      ],
      'correct': 1,
      'explain': 'Philip Gage\'s original 1994 BPE replaced frequent adjacent byte pairs with new symbols to shrink data — a compression technique, not a language-modeling one, until Sennrich et al. adapted the merge loop for subword vocabularies. Encryption and hashing both transform data but for confidentiality or fixed-size fingerprinting, not size reduction, which is what BPE\'s merge loop actually does. Parsing is closer conceptual'
    },
    {
      'stem': 'This BPE pair-counting function is supposed to count every adjacent character pair in a word, weighted by that word\'s corpus frequency. Fill in the blank so it does that correctly.',
      'choices': [
        '1',
        'freq',
        'len(word)',
        'counts[(a, b)]'
      ],
      'correct': 1,
      'explain': 'Each occurrence of a pair inside a word should count once per occurrence of that word in the corpus — a pair inside a word that appears 5 times contributes 5 to the pair\'s total count, which is exactly the weighting used in the merge-loop walkthrough (the (s,c) pair reaching 14 by summing 5+3+4+2 across four distinct words). 1 would undercount every pair by ignoring word frequency entirely, silently turning the corpu'
    },
    {
      'stem': 'Unigram tokenization (Kudo, 2018) builds its final vocabulary by:',
      'choices': [
        'Starting from individual characters and merging the most frequent adjacent pair repeatedly.',
        'Starting from a large candidate vocabulary and pruning the least-useful pieces until the target size is reached.',
        'Starting from whole words and splitting the least frequent ones into characters.',
        'Training a neural network to predict optimal split points directly.'
      ],
      'correct': 1,
      'explain': 'Unigram inverts the direction of BPE/WordPiece: it starts large (a huge set of candidate substrings) and repeatedly removes the pieces whose loss hurts corpus likelihood the least, stopping at the target vocabulary size. Option A describes BPE/WordPiece\'s merge-upward approach, the opposite direction from Unigram. Option C inverts which words get treated specially, and no widely used subword scheme covered in this un'
    },
    {
      'stem': 'A tied-weight embedding matrix of shape (128,000, 4,096) has approximately parameters, and this single matrix serves as both the input embedding and, transposed, the output projection.',
      'choices': [
        '4.1 million',
        '132 million',
        '512 million',
        '1.05 billion'
      ],
      'correct': 2,
      'explain': '128,000 × 4,096 = 524,288,000, roughly 524M parameters — and because the matrix is tied, that single count covers both the input lookup and the output logits projection. 1.05 billion is the untied total (roughly double, one matrix for input and a separate one for output) — the tempting distractor if you forget that tying means one matrix serves both roles rather than two independently sized ones.'
    },
    {
      'stem': 'This embedding lookup is meant to return the vector for a batch of token ids by directly indexing the embedding matrix, the way nn.Embedding does it — a gather, not a matmul. Is this implementation correct, and what is the real problem with it?',
      'choices': [
        'There is no bug — the one-hot matmul returns the mathematically correct vectors.',
        'The bug is that one_hot should have shape (vocab_size, len(token_ids)) instead.',
        'The bug is that E should be transposed before the matmul.',
        'The bug is that this uses @ instead of element-wise multiplication.'
      ],
      'correct': 0,
      'explain': 'This is a direct, correct implementation of Lesson 3\'s one-hot-matmul equivalence — one_hot @ E does zero out every row of E except the ones at each token\'s index and correctly returns shape (len(token_ids), d_model) . It\'s mathematically right; the actual problem with this code is that it\'s wasteful, not wrong — a real implementation would use direct indexing ( E[token_ids] ) instead of building and multiplying a mo'
    }
  ],
  'course-2-foundational-models/unit4': [
    {
      'stem': 'You\'re building a search index over 40 million functions scraped from public repositories: given a natural-language query, return the best-matching function. You need embeddings such that true (query, function) matches are close and everything else is far, checked against millions of candidates at query time. Which pretraining objective s',
      'choices': [
        'Causal language modelling, then take the last hidden state as the embedding.',
        'BERT-style masked language modelling on each side independently, with no shared training signal between the two encoders.',
        'A contrastive objective (InfoNCE) trained jointly over (docstring, function) pairs.',
        'Span corruption with sentinel tokens, generating the function from the docstring.'
      ],
      'correct': 2,
      'explain': 'Retrieval at this scale needs an embedding space explicitly optimized so that true matches are close and everything else is far under a fast similarity operation (cosine/dot product) — that is exactly what InfoNCE trains for, and a dual encoder lets you embed all 40 million functions once, offline. Option A produces representations optimized for predicting the next token, not for being compared to unrelated text; not'
    },
    {
      'stem': 'Raising the InfoNCE temperature τ toward infinity makes the loss focus more sharply on the hardest negative in the batch (the highest-similarity wrong function for a given docstring).',
      'choices': [
        'True',
        'False'
      ],
      'correct': 1,
      'explain': 'It\'s the opposite. As τ → 0, dividing similarities by a tiny number amplifies differences between them, so the softmax sharpens toward whichever candidate has the single highest score — that\'s when the hardest negative dominates the gradient. As τ → ∞, dividing by a huge number crushes all similarities toward the same value, the softmax flattens toward uniform, and the gradient signal vanishes. It\'s tempting to assum'
    },
    {
      'stem': 'You want a single causal, left-to-right decoder — not a separate bidirectional encoder — to autocomplete a function body in an IDE, using both the code already typed before the cursor and the code that already exists after the cursor (e.g., a later return statement). Which technique achieves this without adding bidirectional attention?',
      'choices': [
        'BERT-style 80/10/10 masking applied to the causal model\'s input.',
        'Fill-in-the-middle with document rotation: reorder training documents as prefix, suffix, middle, and train with ordinary next-token prediction.',
        'Lower the softmax temperature during generation so the model attends further ahead.',
        'Increase the effective batch size so in-batch negatives expose more context.'
      ],
      'correct': 1,
      'explain': 'FIM reorders the document so the suffix appears in the token sequence before the middle the model must generate — the causal mask and the CLM objective never change, but the model now conditions on tokens from both sides of the gap by the time it has to fill it in. Option A requires bidirectional attention to work at all (that\'s the premise of MLM), which contradicts "without adding bidirectional attention." Option C'
    },
    {
      'stem': 'Complete the missing line so that this BERT-style masking function correctly implements the 80/10/10 split described in Lesson 2 (80% [MASK] , 10% random token, 10% left unchanged — all three still scored in labels ).',
      'choices': [
        'candidate & (choice >= 0.80)',
        'candidate & (choice >= 0.80) & (choice < 0.90)',
        'candidate & (choice < 0.10)',
        '~to_mask & candidate'
      ],
      'correct': 1,
      'explain': 'The random-replacement bucket must be exactly the middle 10% of the corrupted positions — those with choice in [0.80, 0.90) — leaving the top 10% ( choice >= 0.90 ) as the "left unchanged" bucket. Both bounds are needed, or the random bucket would swallow the unchanged bucket too. Option A looks plausible but includes everything from 0.80 up to 1.0 (20% of candidates, not 10%), silently merging the random and unchang'
    },
    {
      'stem': 'During contrastive pretraining of your docstring/function dual encoder, both embedding towers converge to output nearly identical vectors regardless of input, and training loss stays suspiciously low. Which combination of causes and fixes is most consistent with this failure?',
      'choices': [
        'This is expected behavior once InfoNCE converges — it\'s a sign of a well-trained encoder, not a bug.',
        'Representation collapse — likely from a too-small or too-uniform negative pool and/or missing embedding normalization; fix with L2-normalized embeddings, a larg',
        'The causal mask from Unit 2 is misconfigured, letting the decoder see future tokens; fix by re-checking the attention mask.',
        'The tokenizer from Unit 3 has an unresolved out-of-vocabulary bug; fix by increasing the BPE merge count.'
      ],
      'correct': 1,
      'explain': 'Mapping every input to nearly the same vector is the textbook signature of representation collapse: if negatives are scarce, easy to tell apart trivially, or embeddings aren\'t normalized (letting norm inflation game the loss), the model can drive the loss down without learning a meaningful embedding geometry at all. The standard fixes are exactly normalization, negative pool size/diversity, and temperature tuning — t'
    }
  ],
  'course-2-foundational-models/unit5': [
    {
      'stem': 'According to Hoffmann et al. 2022 ("Chinchilla"), what was the primary flaw in Kaplan et al. 2020\'s original scaling-law conclusions?',
      'choices': [
        'Power laws don\'t actually describe how loss falls with compute.',
        'Kaplan\'s team held the learning-rate schedule\'s decay length fixed across runs of different lengths, which systematically biased the fitted curves toward favori',
        'Kaplan\'s team didn\'t test models large enough to reveal the true trend.',
        'Kaplan\'s team ignored batch size entirely, which invalidated the compute axis.'
      ],
      'correct': 1,
      'explain': 'The power-law relationship itself held up under Chinchilla\'s more careful re-run — the problem was methodological, not conceptual. Fixing the learning-rate schedule bug shifted the optimal ratio to roughly 20 tokens per parameter, revealing that most large models of that era, including GPT-3, were over-parameterized relative to the data they\'d been trained on. A is wrong because Chinchilla\'s whole re-analysis assumes'
    },
    {
      'stem': 'A model has 24 layers, 16 attention heads, d_head = 64 (so d_model = 1,024), plain multi-head attention (kv_heads = heads), batch size 1, bf16 values (2 bytes), and a rollout sequence length of 65,536 tokens. Using KV-cache bytes = 2 · layers · kv_heads · d_head · seq_len · batch · bytes_per_value, the KV-cache size is closest to:',
      'choices': [
        '0.10 GB',
        '3.22 GB',
        '6.44 GB',
        '12.88 GB'
      ],
      'correct': 2,
      'explain': '2 × 24 × 16 × 64 × 65,536 × 1 × 2 = 6,442,450,944 bytes ≈ 6.44 GB. Option B (3.22 GB) is what you get if you drop the leading factor of 2 for storing both keys and values. Option D (12.88 GB) double-counts that factor. Option A is 64x too small, the kind of error that comes from using a much shorter sequence length (around 1,024) instead of the 65,536 specified.'
    },
    {
      'stem': 'A climate-emulation MoE layer has 8 experts of 350M parameters each, plus 200M parameters of shared attention, embeddings, and router combined. Under top-2 routing, what are the active parameters used to process a single token (as opposed to the model\'s total parameter count)?',
      'choices': [
        '0.9B — 200M shared plus 2 × 350M for the two routed experts',
        '3.0B — every expert\'s parameters, whether or not this token used them',
        '2.8B — all 8 experts, excluding the shared components',
        '1.75B — the shared components plus half of every expert\'s parameters'
      ],
      'correct': 0,
      'explain': 'Active parameters count only what a given token actually passes through: the always-on shared components (200M) plus the two experts top-2 routing selected (2 × 350M = 700M), for 900M total — this is what determines that token\'s FLOPs and latency. Option B (3.0B) is the model\'s total parameter count — every expert\'s weights, whether or not this token was routed there — which governs memory footprint, not per-token co'
    }
  ],
  'course-2-foundational-models/unit6': [
    {
      'stem': 'A model fine-tuned on your 12,000 reports gets clean, unambiguous cases right ("large left pleural effusion" → effusion) but consistently mislabels "cannot exclude a small nodule" and "no definite evidence of pneumothorax" as positive findings. What is this evidence of?',
      'choices': [
        'Domain shift — the model hasn\'t seen enough radiology vocabulary.',
        'Task shift specific to hedging and negation — the model hasn\'t learned the logical scope of clinical qualifiers.',
        'Catastrophic forgetting of general English syntax.',
        'An overly large batch size during fine-tuning.'
      ],
      'correct': 1,
      'explain': 'The model clearly has the vocabulary — it gets unambiguous cases right — so this isn\'t a missing-word problem. The failure is specifically on negation and hedging scope, which is a task-shift issue: correctly mapping a passage\'s logical assertion (or denial) to a label. More in-domain vocabulary exposure won\'t fix a model that hasn\'t learned what "cannot exclude" or "no definite evidence of" do to the sentence\'s mean'
    },
    {
      'stem': 'Fill in the blank so that reports from the same patient never appear in both the train and validation sets.',
      'choices': [
        'reports_df["label"]',
        'reports_df.index',
        'reports_df["patient_id"]',
        'reports_df["report_date"]'
      ],
      'correct': 2,
      'explain': 'groups=reports_df["patient_id"] tells the splitter to keep every row sharing a patient ID entirely on one side of the split, which is exactly what a patient-level split requires. reports_df.index (B) would make every row its own group, which degenerates to a plain report-level split — the leakage bug the exercise is meant to fix. label (A) groups by finding type instead of patient, which doesn\'t prevent the same pati'
    },
    {
      'stem': 'This fine-tuning setup for the 4-class report classifier trains without errors, but validation F1 on the minority classes (pneumothorax, effusion) never rises above near-zero even after several epochs. What\'s the bug?',
      'choices': [
        'The weights should be the raw class counts, not their inverse — this code already does that correctly, so the bug must be elsewhere.',
        'class_weights uses raw counts directly instead of their inverse, so the loss over-weights the already-dominant "normal" class instead of the rare findings.',
        'CrossEntropyLoss does not accept a weight argument at all.',
        'The bug is that sort_index() shuffles the labels randomly.'
      ],
      'correct': 1,
      'explain': 'Passing raw counts as weights (8400 for "normal") makes the loss penalize errors on the majority class more , not less — the opposite of what\'s needed to counter imbalance. The fix is to weight inversely to frequency, e.g. class_weights = 1.0 / torch.tensor(class_counts, dtype=torch.float32) (typically renormalized), so the loss compensates for pneumothorax and effusion being rare instead of amplifying the imbalance.'
    },
    {
      'stem': 'A team fine-tunes the full 12-layer encoder on the 12,000 reports at the pretraining learning rate (3e-4), for 15 epochs, with no warmup. Training and validation loss by epoch:',
      'choices': [
        'The model architecture is too small for the task; add more transformer layers.',
        'The learning rate is at pretraining scale with too many epochs and no early stopping, driving overfitting/forgetting on a small fine-tuning set — lower the lear',
        'Validation loss rising while train loss falls is expected and requires no changes — just train longer.',
        'The class weights are miscalibrated, causing the rise in validation loss.'
      ],
      'correct': 1,
      'explain': 'The signature — training loss cruising to near zero while validation loss and macro-F1 peak early (epoch 3) and then steadily worsen — is the classic overfitting/forgetting curve from a learning rate that\'s too large for the small fine-tuning set, made worse by running far past the point where validation performance peaked. The fix is exactly Lesson 2\'s recipe: drop to a fine-tuning-scale rate (1e-5 to 5e-5, with war'
    },
    {
      'stem': 'A hospital pilot has only 80 labelled report impressions so far, spread thin across all four finding categories, with 12,000 more to be labelled over the coming months. Which approach is most appropriate right now, and why?',
      'choices': [
        'Full fine-tuning of all 12 layers with discriminative learning rates — the same recipe as the final 12,000-report model.',
        'Domain-adaptive pretraining alone, with no supervised step, since 80 labels is too few to bother with.',
        'Few-shot prompting with a handful of example reports per class, since 80 labelled examples sits well below the labelled-data crossover where fine-tuning reliabl',
        'Feature extraction with a linear head trained on all 12 layers concatenated together, to maximize the information available to only 80 examples.'
      ],
      'correct': 2,
      'explain': 'At 80 labelled examples, both full fine-tuning and feature-extraction training risk instability or trivial memorization, and the crossover point where fine-tuning reliably outperforms prompting sits in the low thousands of labelled examples — well above 80. Few-shot prompting with a well-chosen handful of examples per class is the more appropriate tool at this data volume, with fine-tuning revisited once the labelled'
    }
  ],
  'course-2-foundational-models/unit7': [
    {
      'stem': 'Using the same mixed-precision recipe from Lesson 1 (fp32 master weights + bf16 weights + bf16 gradients + two fp32 Adam moments = 16 bytes/parameter), what is the closest full fine-tuning training-memory total for a 13B-parameter model?',
      'choices': [
        '≈ 26 GB',
        '≈ 104 GB',
        '≈ 208 GB',
        '≈ 416 GB'
      ],
      'correct': 2,
      'explain': '16 bytes/param × 13×10⁹ params = 208×10⁹ bytes ≈ 208 GB. 104 GB is what you\'d get from only 8 bytes/param (for example, forgetting the two Adam moment buffers and counting only master weights + working weights + gradients) — a common shortcut that undercounts by exactly the Adam contribution. 416 GB would require 32 bytes/param, which double-counts something in the recipe.'
    },
    {
      'stem': 'A teammate\'s instruction-tuning data pipeline for the telecom support model produces this labels tensor. Support tickets look correct in spot checks, but the fine-tuned model starts echoing customer complaints back nearly verbatim before answering them, and needs far more data than expected to learn the escalation policy. Find the bug.',
      'choices': [
        'The function should return input_ids unchanged, since labels and inputs are always identical in causal LM training.',
        'The function never masks the system and user tokens with -100 , so the model computes loss on — and learns to reproduce — the prompt tokens as well as the respo',
        'The bug is that assistant_start and assistant_end are unused parameters that should be deleted.',
        'The function should shift input_ids by one position before copying, or the model will never see next-token targets.'
      ],
      'correct': 1,
      'explain': 'labels is just a raw copy of input_ids with no masking at all, so cross-entropy loss is computed on every token, including the system prompt and the customer\'s own message. That matches the symptom exactly: the model partially learns to reproduce prompt content (echoing the complaint) and dilutes its gradient budget away from the assistant span, which is also why it needs more data than expected to learn the policy w'
    },
    {
      'stem': 'A colleague proposes: "Fine-tune a LoRA adapter per tenant, then call merge() on each one and save the merged weights, so inference has zero LoRA overhead for every tenant." This looks right — merging genuinely does eliminate the low-rank matmul\'s latency. What breaks when this plan is deployed to serve all 40 tenants concurrently on the ',
      'choices': [
        'Nothing breaks; merged adapters are strictly better in every deployment scenario.',
        'Merging silently changes the model\'s numerical outputs even for unrelated inputs, corrupting every tenant\'s responses.',
        'Each merged model is now a full standalone weight matrix again, so serving 40 of them concurrently is back to needing 40 × 14 GB of resident GPU memory — the ex',
        'Merging requires retraining the adapter from scratch, so it cannot be applied after training completes.'
      ],
      'correct': 2,
      'explain': 'Merging is exact and correct per tenant — it\'s a legitimate latency win for a single dedicated deployment. The problem only appears at the 40-tenant serving stage: a merged adapter can no longer be hot-swapped against a shared frozen base, so each tenant needs its own resident copy of the full weight matrix again, reproducing the 560 GB serving wall from Lesson 1 instead of avoiding it. B is false — merging is an exa'
    },
    {
      'stem': 'Which QLoRA component is specifically responsible for preventing an out-of-memory crash when a training batch of unusually long support-conversation sequences causes a transient spike in optimizer-state memory?',
      'choices': [
        'NF4 quantization',
        'Double quantization',
        'Paged optimizers',
        'Rank selection'
      ],
      'correct': 2,
      'explain': 'Paged optimizers use NVIDIA unified memory to automatically move optimizer states between GPU and CPU memory when a spike would otherwise overflow the card, then page them back — exactly the transient-spike scenario described. NF4 and double quantization both reduce the static footprint of the frozen base weights and their quantization constants — they don\'t respond to a training-time spike. Rank selection controls t'
    }
  ],
  'course-2-foundational-models/unit8': [
    {
      'stem': 'A model scores unusually well on a public multiple-choice benchmark, and you suspect its pretraining data included the benchmark itself. Which of the following is the strongest single piece of evidence for contamination?',
      'choices': [
        'The model also does well on your task-specific held-out eval set.',
        'Rewording the benchmark questions with identical meaning causes accuracy to drop sharply.',
        'The model\'s stated confidence is high across all answer choices.',
        'The benchmark has more questions than your held-out eval set.'
      ],
      'correct': 1,
      'explain': 'Genuine capability should survive a meaning-preserving paraphrase; a sharp accuracy drop under rewording means the model had memorized the surface form of the specific questions rather than the underlying skill. A is tempting but tells you nothing about contamination on the other benchmark — doing well on your own held-out set is good news about your task, not evidence either way about the public benchmark. C and D a'
    },
    {
      'stem': 'A reward model is trained on pairs of claimant-question answers where a human rater picked the better response. Under the Bradley-Terry framework, what does the reward model actually learn?',
      'choices': [
        'An absolute quality score on a fixed scale, such as 1 to 10, for any single answer in isolation.',
        'A scalar function such that the sigmoid of the difference between two answers\' scores approximates the probability the first was preferred.',
        'A binary classification of each answer as "correct" or "incorrect" against ground truth.',
        'The exact dollar amount that should appear in a correct eligibility answer.'
      ],
      'correct': 1,
      'explain': 'Bradley-Terry models the preference probability as σ(r(x,y_w) − r(x,y_l)) — the reward model only ever has to rank two answers relative to each other, never assign an absolute score. A is wrong because nothing in the Bradley-Terry loss anchors the reward to a fixed scale — only relative differences are trained. C and D confuse a preference-ranking reward model with a fact-checker or an answer key, which it is not; it'
    },
    {
      'stem': 'Most of this assistant\'s answers are short: one number, one regulation citation, one caveat, delivered in a couple of sentences. Which latency metric matters most for how responsive the assistant feels to these claimants?',
      'choices': [
        'Time-to-first-token',
        'Time-per-output-token',
        'Total GPU throughput',
        'Cost per million output tokens'
      ],
      'correct': 0,
      'explain': 'For a short answer, the whole stream finishes almost as soon as it starts, so the wait before the first token dominates the felt experience. B (time-per-output-token) matters more for the minority of long, multi-paragraph explanations of interacting benefits, where the reader is watching text stream in over several seconds. C and D are real capacity and cost concerns for the operator, but neither is what a single cla'
    },
    {
      'stem': 'A junior engineer argues: "Unit 7 showed mixed-precision (fp16/bf16) training reaches the same loss as fp32 with proper loss scaling, so int4 post-training quantization at serving time should be just as lossless." Combining Unit 5\'s scaling-law material with this unit\'s material on quantization, what is the strongest objection?',
      'choices': [
        'Quantization and mixed-precision training use different numbers of bits, so the comparison is meaningless on its face.',
        'Mixed-precision training keeps a full-precision master copy of weights and gradients throughout training, actively correcting rounding error at every step; post',
        'Mixed-precision training is always more accurate than any form of quantization, in any context.',
        'int4 quantization only affects intermediate activations, not the learned weights, so it cannot touch stored facts at all.'
      ],
      'correct': 1,
      'explain': 'This is the real mechanism: mixed-precision training corrects for rounding continuously via a full-precision master copy, while post-training quantization rounds once and never corrects, striking hardest exactly where scaling laws say capacity is thinnest — the rare facts and precise thresholds a small share of parameters carry. A gestures at a real difference (bit count) but doesn\'t explain why it matters, so it\'s n'
    }
  ],
  'course-3-text-processing/unit1': [
    {
      'stem': 'A moderation pipeline needs to normalise a post that mixes precomposed accented characters, Cyrillic look-alike letters used to dodge a keyword filter, and a fullwidth Unicode variant of a Latin letter. Which normalisation form is the right choice, and why?',
      'choices': [
        'NFD, because it decomposes everything into base characters plus combining marks',
        'NFC, because it always prefers the shortest possible representation',
        'NFKC, because it collapses both canonical and compatibility variants, including many homoglyph and fullwidth substitutions',
        'Lowercasing, because case folding also normalises alternate character forms'
      ],
      'correct': 2,
      'explain': 'NFKC (Compatibility Composition) collapses both canonically equivalent forms and compatibility variants — fullwidth letters, ligatures, and many stylistic substitutions — into one standard form, which is exactly the security-relevant behavior needed against homoglyph and compatibility-character evasion. NFD decomposes rather than composes, which doesn\'t help match variants to a single form for lookup. NFC only handle'
    },
    {
      'stem': 'Why does whitespace tokenization handle "fr€€ m0ney" (a leetspeak spam attempt) particularly badly compared to a subword tokenizer?',
      'choices': [
        'Whitespace tokenization cannot process any string containing a currency symbol',
        'Whitespace tokenization treats "fr€€" and "m0ney" as whole, previously-unseen tokens likely to map to UNK, while a subword tokenizer can decompose them into kno',
        'Whitespace tokenization always produces more tokens than subword tokenization on any input',
        'Whitespace tokenization requires a dictionary lookup that a subword tokenizer skips'
      ],
      'correct': 1,
      'explain': 'Since neither "fr€€" nor "m0ney" appeared during training as whole units, a word-level vocabulary has no entry for them and falls back to a generic UNK token, erasing the word entirely. A subword tokenizer can fall back to smaller known pieces — individual characters or short substrings — so the string is still represented, just with more tokens. Whitespace tokenizers process currency symbols and digits fine as chara'
    },
    {
      'stem': 'Why is the classical stemming/lemmatization/stopword-removal stack largely skipped when preparing input for a modern subword transformer, but still used in some retrieval and feature-engineering pipelines?',
      'choices': [
        'Transformers cannot process any text that hasn\'t been stemmed first, so the stack is irrelevant, not skipped',
        'Subword tokenization already groups morphological variants into overlapping pieces the model learns to treat similarly, while classical exact-match retrieval an',
        'Stemming and lemmatization were both proven mathematically incorrect and are never used anywhere today',
        'Transformers are trained specifically to reverse stemming, making the step redundant'
      ],
      'correct': 1,
      'explain': 'A subword tokenizer implicitly captures morphological relationships by breaking related words into shared pieces, and attention lets the model weigh context without pre-decided stopword rules — so the classical stack\'s job is already partly done by the tokenizer and the model. Sparse retrieval indexes and classical feature pipelines (bag-of-words, TF-IDF) still rely on exact string matching, where explicit stemming/l'
    }
  ],
  'course-3-text-processing/unit2': [
    {
      'stem': 'A 50,000-document legal corpus with a 100,000-term vocabulary produces a document-term matrix with roughly what proportion of nonzero entries?',
      'choices': [
        'Roughly 50%, since half the documents share common legal boilerplate.',
        'Well under 0.1% — the matrix is extremely sparse, since any single document only uses a small fraction of the full vocabulary.',
        'Roughly 100%, since every document contains at least one instance of most common words like "the" and "shall."',
        'It depends entirely on whether stemming was applied during preprocessing.'
      ],
      'correct': 1,
      'explain': 'A single legal document, even a long one, typically touches only a few hundred distinct terms out of a 100,000-term vocabulary, so well over 99.9% of the document-term matrix is zero. Option C is the tempting distractor because a handful of very common words ("the," "shall") really do appear in nearly every document, but those few common columns don\'t make the matrix dense overall — the vast majority of the 100,000 c'
    },
    {
      'stem': 'Under a pure bag-of-words representation, "the tenant breached the lease" and "the lease breached the tenant" produce identical vectors.',
      'choices': [
        'True',
        'False'
      ],
      'correct': 0,
      'explain': 'True. Bag-of-words only counts term occurrences and discards all information about order, so any two sentences using the exact same multiset of words produce the exact same count vector, regardless of how nonsensical or meaning-reversing the reordering is. This is precisely the limitation that motivates n-grams (Lesson 3), which capture short contiguous sequences and so can distinguish some — though not all — reorder'
    },
    {
      'stem': 'Cosine similarity is preferred over raw Euclidean distance for comparing document vectors because it is insensitive to , dividing out the vectors\' magnitude and comparing only their angle.',
      'choices': [
        'vocabulary size',
        'document length',
        'term frequency',
        'stopword removal'
      ],
      'correct': 1,
      'explain': 'Document length. Cosine similarity divides the dot product by the product of the two vectors\' norms, canceling out overall magnitude — so a short motion and a long brief using the same terms in the same proportions score high similarity, even though their raw count vectors differ enormously in size. "Term frequency" is tempting because term frequency is exactly what feeds the dot product, but the normalization step i'
    },
    {
      'stem': 'In a corpus of 10,000 contracts, "agreement" appears in 9,800 of them and "indemnification" appears in 300 of them. Under TF-IDF, which statement is correct?',
      'choices': [
        '"agreement" will have a much higher idf value, since it appears more often overall.',
        '"indemnification" will have a much higher idf value, since it appears in far fewer documents.',
        'Both terms will have identical idf values, since idf only depends on term frequency within a document.',
        'idf cannot be computed unless every document contains both terms.'
      ],
      'correct': 1,
      'explain': 'idf(t) = log(N / (1 + df(t))) grows as document frequency df(t) shrinks — "indemnification," with a much smaller df (300 vs. 9,800 out of 10,000), gets a much larger idf, correctly rewarding its rarity and discriminative power. Option C is wrong because it confuses idf (a corpus-wide statistic, one value per term) with term frequency (a per-document statistic) — idf has nothing to do with counts within a single docum'
    },
    {
      'stem': 'Because TF-IDF weights terms by informativeness, a TF-IDF-based search for "automobile accident" will reliably surface a highly relevant document that only uses the words "car crash."',
      'choices': [
        'True',
        'False'
      ],
      'correct': 1,
      'explain': 'False. TF-IDF is still a bag-of-words method underneath its weighting — each distinct token is its own orthogonal dimension. "Automobile" and "car" share no vocabulary, so their TF-IDF vectors have zero dot product regardless of how semantically similar the words are to a human reader. The intuition that "TF-IDF understands importance, so it should understand synonymy too" is the trap here — TF-IDF only re-weights ex'
    },
    {
      'stem': 'The log in idf(t) = log(N / (1 + df(t))) compensates for , the empirical pattern in which a small number of words dominate total word occurrences while most words occur rarely.',
      'choices': [
        'Kneser-Ney smoothing',
        'the zero-probability problem',
        'Zipf\'s law',
        'L2 normalization'
      ],
      'correct': 2,
      'explain': 'Zipf\'s law. Word (and n-gram) frequencies in natural language are extremely skewed — a handful of terms account for most occurrences, while a long tail of terms is rare. The log compresses the huge swings in N/df(t) that this skew would otherwise produce, so idf behaves as a manageable weighting factor. "The zero-probability problem" is a distractor from Lesson 3 — it refers to unseen n-grams getting zero probability'
    },
    {
      'stem': 'Complete the function so it returns the list of bigrams (as tuples) from a token list, matching the definition used in Lesson 3.',
      'choices': [
        'tokens, tokens',
        'tokens, tokens[1:]',
        'tokens[1:], tokens[2:]',
        'tokens[1:], tokens[:-1]'
      ],
      'correct': 1,
      'explain': 'zip(tokens, tokens[1:]) pairs each token with the one immediately after it; zip stops at the shorter sequence, so the last token is correctly left without a successor pair. tokens[1:], tokens[2:] (option C) skips the first token entirely and pairs each remaining token with the one two positions along in the original list — it drops the opening bigram and shifts every other pair one place. zip(tokens, tokens) (option '
    },
    {
      'stem': 'This bigram language model probability function has a bug: it returns exactly 0.0 for any bigram unseen in training, which will zero out an entire sequence\'s probability. What is the minimal fix, consistent with Lesson 3\'s add-k smoothing?',
      'choices': [
        'Add a try/except around the division to catch ZeroDivisionError.',
        'Add 1 to the numerator and add the vocabulary size V to the denominator: (bigram_counts[(w1,w2)] + 1) / (unigram_counts[w1] + V) .',
        'Replace the function with a lookup into a precomputed table of only the bigrams that occurred in training.',
        'Sort the bigram counts and return the median count instead of the exact count.'
      ],
      'correct': 1,
      'explain': 'This is add-1 (Laplace) smoothing: adding 1 to every bigram count and V (vocabulary size) to every unigram count guarantees every possible bigram gets a small nonzero probability, fixing the zero-probability problem without changing the relative ordering of well-attested bigrams much. Option A is the tempting distractor because the raw function as written won\'t actually raise ZeroDivisionError for an unseen bigram (t'
    }
  ],
  'course-3-text-processing/unit3': [
    {
      'stem': 'Which pairing correctly attributes the two foundational ideas behind the distributional hypothesis?',
      'choices': [
        'Firth formalized "distributional structure" as a linguistic theory; Harris popularized "you shall know a word by the company it keeps."',
        'Harris formalized distributional structure; Firth is credited with the "company it keeps" line.',
        'Mikolov coined both ideas in the 2013 word2vec paper.',
        'Pennington and Socher first proposed the distributional hypothesis in the GloVe paper.'
      ],
      'correct': 1,
      'explain': 'Zellig Harris formalized the distributional hypothesis in the 1950s; J.R. Firth\'s 1957 line is the memorable popularization of the same idea. Mikolov\'s word2vec (2013) operationalized the hypothesis into a trainable algorithm decades later — it didn\'t originate the idea. Option A swaps the two names\' contributions. Option D is wrong because GloVe (2014) is a training method built on the same pre-existing hypothesis, '
    },
    {
      'stem': 'A resume-matching pipeline needs embeddings that group words by broad topical relatedness (e.g., "python" near "pandas," "data," and "backend") rather than strict grammatical substitutability. Which training choice best supports that goal?',
      'choices': [
        'Use CBOW instead of skip-gram.',
        'Use a small context window (2–3 words).',
        'Use a larger context window (8–10 words).',
        'Increase the negative sampling exponent above 1.0.'
      ],
      'correct': 2,
      'explain': 'A larger window captures topical co-occurrence across a whole sentence or paragraph, pulling together words that share a subject matter even if they never sit adjacent. Small windows instead favor syntactic substitutability — words that occupy the same grammatical slot. A is a red herring: CBOW vs. skip-gram affects rare-word quality and training speed, not the syntactic/topical trade-off, which is governed by window'
    },
    {
      'stem': 'Why does word2vec sample negative words with probability proportional to unigram_frequency^0.75 rather than raw unigram frequency?',
      'choices': [
        'Raising to the 0.75 power makes the softmax computation itself faster.',
        'It flattens the distribution enough to boost sampling of rare/mid-frequency words and damp extremely frequent filler words, without going fully uniform.',
        'It guarantees the sampled negatives are never true context words.',
        'It converts the multi-class problem back into an exact softmax.'
      ],
      'correct': 1,
      'explain': 'The 0.75 exponent is an empirically-chosen smoothing factor: it reduces the sampling dominance of very common words (like "the," "and," or generic filler in job postings) while still respecting overall frequency more than a pure uniform distribution would, producing better-quality vectors for the specific, informative vocabulary that matters for skill matching. A is wrong — negative sampling\'s speed gain comes from a'
    },
    {
      'stem': 'This skip-gram-with-negative-sampling step is missing the negative-pair gradient direction. Given that neg_score = sigmoid(dot(v_c, v_neg)) should be pushed toward 0 (unlike the positive pair, pushed toward 1), which line correctly completes the update?',
      'choices': [
        'neg_score - 1.0',
        'neg_score',
        '1.0 - neg_score',
        '-neg_score'
      ],
      'correct': 1,
      'explain': 'The gradient of the binary cross-entropy loss with respect to the dot product is (predicted − target). For the positive pair, target is 1, giving (pos_score − 1.0). For a negative pair, target is 0, giving (neg_score − 0.0), which simplifies to just neg_score . Option A reuses the positive pair\'s formula with the wrong target. Option C flips the sign, which would push negatives together with the center word instead o'
    },
    {
      'stem': 'This WEAT-style association function is meant to compute s(w, A, B): the mean cosine similarity of word w to attribute set A, minus the mean cosine similarity of w to attribute set B. It returns a distorted magnitude whenever the two attribute sets differ in size (say 5 names in A against 3 in B). Find the bug.',
      'choices': [
        'It uses sum instead of np.mean for both sets, so unequal-sized attribute sets (e.g. 5 names in A, 3 in B) bias the result toward whichever set is larger, indepe',
        'cosine should be replaced with a raw dot product.',
        'The subtraction order should be sum_b - sum_a .',
        'There is no bug; the function is correct as written.'
      ],
      'correct': 0,
      'explain': 'WEAT\'s association score is explicitly defined using the mean similarity over each attribute set, precisely so that set size doesn\'t confound the comparison — summing instead of averaging means a larger attribute set will mechanically produce a larger sum regardless of per-word similarity, corrupting the score whenever |A| ≠ |B|. Option C just flips the sign convention, which doesn\'t fix the size-confound bug. Option'
    }
  ],
  'course-3-text-processing/unit4': [
    {
      'stem': 'A user has typed "Running late, be there in about" and the keyboard\'s word-level LSTM-LM has never seen this exact five-word sequence during training, yet it still suggests "10", "20", and "five" with reasonable confidence. What best explains this?',
      'choices': [
        'The model memorized every possible five-word prefix during training and looked this one up.',
        'The embedding and recurrent layers generalize from similar contexts seen during training, so a novel exact sequence still maps to a sensible region of hidden-st',
        'The model falls back to a uniform random guess whenever it encounters an unseen context.',
        'The vocabulary was restricted at training time to only contain numbers after "about".'
      ],
      'correct': 1,
      'explain': 'This is the core generalization advantage over n-grams from Lesson 1: the continuous hidden state produced by the embedding + LSTM stack represents context, not an exact lookup key, so semantically similar contexts (any "be there in about ___" phrasing) produce similar predictions even without exact repetition. A is the n-gram-style failure mode this unit explicitly moves away from — an RNN-LM has no lookup table of '
    },
    {
      'stem': 'Teacher forcing means that during training, at each timestep the model is fed its own predicted previous token as input, rather than the ground-truth token from the training sequence.',
      'choices': [
        'True',
        'False'
      ],
      'correct': 1,
      'explain': 'Teacher forcing is the opposite: the model is fed the ground-truth previous token at every position during training, which is what allows the whole sequence to be trained in parallel with stable gradients rather than compounding the model\'s own early mistakes. The scenario described (feeding the model\'s own predictions forward) is closer to how the model actually behaves at inference time, which is precisely the trai'
    },
    {
      'stem': 'The keyboard\'s inline "ghost text" completion — the single grey suggestion shown ahead of the cursor as the user types — should almost always use which sampling approach, and why?',
      'choices': [
        'Nucleus (top-p) sampling with p=0.95, to maximize the diversity of possible completions shown.',
        'Greedy decoding, because the user expects the single most likely continuation, and unpredictable variety would undermine trust in one specific inline suggestion',
        'Temperature sampling with T=2.0, to surface more surprising and creative completions.',
        'Uniform random sampling over the full vocabulary, to give every word a fair chance of appearing.'
      ],
      'correct': 1,
      'explain': 'A single inline suggestion is judged harshly if it looks wrong or erratic, since there\'s no ranked list to hedge with — greedy decoding (always the top logit) is the safe, expected choice here, as Lesson 1 discusses for ghost-text specifically. A and C both intentionally increase variety or surprise, which is useful for a ranked row of multiple chips but actively hurts a single, high-stakes inline suggestion. D would'
    },
    {
      'stem': 'A technique that reuses the embedding matrix as the transpose of the final projection layer, roughly halving the parameter count in embedding-dominated small models, is called .',
      'choices': [
        'gradient clipping',
        'weight tying',
        'truncated BPTT',
        'adaptive softmax'
      ],
      'correct': 1,
      'explain': 'Lesson 2 covers this directly: since the embedding table and projection layer share shape when embed_dim equals hidden_dim, tying them into one shared matrix removes a duplicate large matrix from the model, which matters most in small on-device models. Gradient clipping addresses exploding gradients during training, not parameter count. Truncated BPTT bounds the backward pass over long/streaming sequences. Adaptive s'
    },
    {
      'stem': 'Why does adaptive softmax reduce the average cost of the final vocabulary projection on a keyboard LM, given a 30,000-token vocabulary?',
      'choices': [
        'It reduces the total vocabulary the model can ever predict from 30,000 down to a few hundred words.',
        'It exploits the Zipfian frequency distribution of language: a small, cheaply-computed head cluster of frequent words resolves the vast majority of real predicti',
        'It replaces softmax with a lookup table, eliminating normalization entirely.',
        'It only works if the embedding and projection matrices are tied.'
      ],
      'correct': 1,
      'explain': 'As Lesson 2 explains, adaptive softmax buckets the vocabulary by frequency; because real text is Zipfian, the small head cluster of the most frequent words is checked at full cost on essentially every prediction, while the larger, cheaper-per-token tail clusters are only reached for the (much rarer) uncommon-word predictions — so the expected cost per prediction drops sharply. A is wrong — the full vocabulary is stil'
    },
    {
      'stem': 'Federated learning, as used for keyboard personalization, works by uploading each user\'s raw typed text to a central server, which trains one improved shared model on the combined dataset.',
      'choices': [
        'True',
        'False'
      ],
      'correct': 1,
      'explain': 'The entire point of federated learning, as Lesson 3 describes, is that raw text never leaves the device — each device computes a local model update from its own private data, and only that update (not the underlying text) is sent to the server for aggregation into an improved shared model. The scenario in the question describes ordinary centralized training on collected raw text, which is exactly what federated learn'
    },
    {
      'stem': 'A teammate wrote this streaming keyboard-LM session handler, but users report that suggestions get slower and slower the longer they keep typing in a single text field (a long message eventually takes seconds per keystroke instead of milliseconds). Find the bug and explain the fix.',
      'choices': [
        'The bug is in tokenizer.retokenize — it should return a fixed-size array instead of a growing list.',
        'The bug is that the hidden state h, c is reset and the entire typed history is replayed through the LSTM on every single keystroke, turning O(1) per-step work i',
        'The bug is that top_suggestions is called with k=3 instead of k=1, which is slower.',
        'The bug is that self.model should be re-initialized on every keystroke to avoid stale predictions.'
      ],
      'correct': 1,
      'explain': 'Lesson 3\'s whole point about O(1) per-step state is violated here: init_state() plus a full replay loop means keystroke N does N steps of LSTM work, so a long message degrades quadratically overall (and linearly per keystroke) — exactly the slowdown users are reporting. The fix persists self.h, self.c as session state (as in the lesson\'s KeyboardLMSession ) and calls self.model.step once per new keystroke on top of t'
    },
    {
      'stem': 'A keyboard LM\'s word-level model returns None for a token because it\'s out-of-vocabulary (e.g., the user is typing a friend\'s name for the first time). Complete the missing line so the session falls back to the character-level model instead of returning no suggestions at all.',
      'choices': [
        'return []',
        'return session.char_fallback.predict(session.typed_token_ids)',
        'raise ValueError("unknown token")',
        'return top_suggestions(logits, k=3) (reusing the previous logits)'
      ],
      'correct': 1,
      'explain': 'This is exactly the cold-start handling from Lesson 3: an out-of-vocabulary token should route to the smaller character-level (or n-gram) fallback model, which operates over a fixed alphabet and so has no "unknown token" problem, keeping the suggestion bar populated instead of going blank. A silently gives up and degrades the product experience for every novel word. C would crash the keyboard mid-sentence over an ent'
    }
  ],
  'course-3-text-processing/unit5': [
    {
      'stem': 'Your pipeline ingests 200,000 earnings-call transcript snippets per day and must tag each one "material guidance change" or "routine" with a strict 50ms latency budget per snippet. Which approach fits best?',
      'choices': [
        'Zero-shot prompt each snippet to a large GPT-class model.',
        'Fine-tune a BERT encoder with a sequence-classification head on labeled examples.',
        'Fine-tune a GPT decoder to generate a one-word label token for each snippet.',
        'Prompt a GPT-class model to generate a one-paragraph summary, then classify the summary.'
      ],
      'correct': 1,
      'explain': 'Fixed two-label schema, high volume, and a tight latency budget is exactly the profile where a fine-tuned BERT classification head wins on latency, cost, and determinism. Option A is too slow and costly at this volume, and risks inconsistent labeling. Option C works around a limitation BERT doesn\'t have — routing classification through token generation adds complexity for no benefit here. Option D adds a whole unnece'
    },
    {
      'stem': 'Complete the sub-word label alignment loop so that continuation word-pieces (like "##TR" in a split ticker) are correctly excluded from the loss.',
      'choices': [
        'label_to_id[labels[word_id]]',
        '-100',
        '0',
        'label_to_id["O"]'
      ],
      'correct': 1,
      'explain': 'Continuation word-pieces must be masked with the ignore index so they contribute nothing to the loss and are skipped in entity-level evaluation — only the first piece of each word carries a real label. Option A repeats the label onto every fragment, the classic bug from Lesson 2: it inflates the loss and corrupts span-level metrics. Options C and D both assign a real, counted label ("O" or class 0) to a fragment that'
    },
    {
      'stem': 'A team few-shot prompts a GPT model for headline sentiment and finds accuracy drops 15 points when they simply reorder the same three examples in the prompt, with no other change. What does this best illustrate?',
      'choices': [
        'The model is fundamentally incapable of sentiment classification.',
        'Reordering pushed the prompt over the model\'s context-window limit.',
        'In-context learning is sensitive to prompt format, not just prompt content.',
        'The model requires fine-tuning before it can do any classification task.'
      ],
      'correct': 2,
      'explain': 'Prompt sensitivity — where order, wording, and formatting move accuracy independent of the underlying task difficulty — is a well-documented property of in-context learning, and it\'s exactly why prompts need testing like code. A is contradicted by the fact that some ordering scored well. B is implausible for three short examples, far under typical context limits. D overreaches: the same model scored well under one or'
    },
    {
      'stem': 'An analyst wants one nuanced, well-written 150-word summary paragraph of today\'s biggest earnings surprise for a morning newsletter — produced once, not at scale. Which approach is required?',
      'choices': [
        'A fine-tuned BERT sequence-classification head.',
        'A fine-tuned BERT token-classification tagger.',
        'A prompted GPT-class decoder model.',
        'Either BERT or GPT, since both can generate text equally well.'
      ],
      'correct': 2,
      'explain': 'Producing novel, fluent prose is a generation task, and generation is structurally GPT\'s job — its causal decoder produces text one token at a time. It\'s also low-volume and one-off, so the API latency and cost that ruled GPT out in Question 1 aren\'t a concern here. Options A and B are both understanding-task heads that output a label or a set of tags, never free text — neither has a mechanism to produce a paragraph.'
    }
  ],
  'course-3-text-processing/unit6': [
    {
      'stem': 'A clinical note contains the phrase "stage II breast cancer," and your annotation guidelines want both "breast cancer" tagged as DISEASE and "stage II breast cancer" tagged as a separate STAGED_CONDITION span. Which statement about representing this with flat BIO tagging is correct?',
      'choices': [
        'Flat BIO handles this fine as long as you use BIOES instead of plain BIO.',
        'Flat BIO cannot represent both spans simultaneously, because each token gets exactly one tag; you\'d need to drop one span, merge them into a composite tag, or m',
        'Flat BIO handles this by tagging "II" as O and the rest as normal DISEASE tokens.',
        'This is only a problem for BILOU, not for BIO/IOB2.'
      ],
      'correct': 1,
      'explain': 'BIO\'s data structure is a single label per token, so two overlapping spans covering the same tokens with different types cannot both be represented without losing information about one of them. Option A is wrong because BIOES also assigns exactly one tag per token — adding E/S tags sharpens boundaries within a single flat sequence but does nothing to enable overlapping spans. This is a structural limit of flat taggin'
    },
    {
      'stem': 'A colleague wrote this BIO-to-span converter for extracting drug/dose/disease entities from tagged clinical tokens. It works on simple cases but silently merges two adjacent, different-type entities that happen to sit next to each other with no O token between them (e.g., a DRUG entity immediately followed by a DOSE entity, tagged B-DRUG ',
      'choices': [
        'The bug is in the B- branch — it should never close the current span, so remove the if cur: spans.append(cur) line.',
        'The bug is in the I- branch — it extends cur for any I- tag without checking that tag[2:] matches cur[2] (the current span\'s type); an I- tag of a different typ',
        'The bug is that the function should track spans in a dictionary instead of a list.',
        'There is no bug; this is expected BIO behavior for adjacent entities.'
      ],
      'correct': 1,
      'explain': 'Per the BIO grammar from Lesson 1, an I-TYPE tag is only a legal continuation of a B-TYPE / I-TYPE of the same type. The buggy code extends cur \'s span (and silently keeps its original type) whenever it sees any I- tag, so a malformed or model-predicted I-DOSE right after an open DRUG span gets absorbed into the DRUG entity instead of being treated as a boundary violation. The fix adds a type check: elif tag.startswi'
    },
    {
      'stem': 'Your team is choosing an averaging method for reporting F1 across seven note-routing specialty classes. Rheumatology makes up only 2% of notes, but a missed rheumatology-relevant note has serious clinical consequences and your team wants the reported metric to reflect the model\'s weakness on that class rather than let it hide behind stron',
      'choices': [
        'Micro-averaged F1, because it reflects overall system throughput.',
        'Weighted-averaged F1, because it accounts for how rare rheumatology notes actually are.',
        'Macro-averaged F1, because it weights every class equally regardless of frequency, so rheumatology\'s score isn\'t diluted by common classes.',
        'Accuracy, since it\'s the simplest metric to communicate to stakeholders.'
      ],
      'correct': 2,
      'explain': 'Macro-averaging computes each class\'s F1 independently and takes an unweighted mean, so rheumatology\'s F1 counts exactly as much as internal medicine\'s, surfacing a weak rare class instead of letting it get outvoted. Weighted averaging (B) would weight rheumatology\'s contribution by its 2% support, meaning a rheumatology failure barely moves the number — the opposite of what the team wants. Micro-averaging (A) pools '
    },
    {
      'stem': 'Given the emission and transition score arrays below (same convention as Lesson 2\'s Viterbi walkthrough: transitions[i][j] is the score of moving from tag i to tag j ), fill in the missing line inside the Viterbi recurrence so that dp[t, k] correctly holds the best cumulative score of any legal path ending in tag k at position t .',
      'choices': [
        'emissions[t, k] + transitions[:, k]',
        'dp[t-1] + transitions[:, k] + emissions[t, k]',
        'dp[t-1] * transitions[:, k]',
        'emissions[t, k] alone, since transitions only matter at decode time for tie-breaking'
      ],
      'correct': 1,
      'explain': 'Each candidate score is the best cumulative score of a legal path ending in every possible previous tag ( dp[t-1] , a vector over all previous tags) plus the transition score into tag k from each of those previous tags ( transitions[:, k] ), plus the flat emission score for tag k at position t ( emissions[t, k] , a scalar broadcast over the vector). Taking the argmax over that combined vector picks the best previous '
    }
  ],
  'course-3-text-processing/unit7': [
    {
      'stem': 'A beam search translator for Haitian Creole keeps truncating output before the location clause, even though the full-length continuation is clearly more accurate. Which change most directly addresses this?',
      'choices': [
        'Increase the beam width from 4 to 8.',
        'Apply length normalization to the cumulative log-probability score.',
        'Switch from teacher forcing to autoregressive training.',
        'Add a coverage penalty vector to the attention mechanism.'
      ],
      'correct': 1,
      'explain': 'Raw cumulative log-probability is a sum of negative terms, so every additional generated token makes the score more negative — beam search will systematically prefer shorter hypotheses unless the score is divided by length^alpha to make the comparison length-fair. Widening the beam (A) explores more hypotheses but doesn\'t change the scoring bias that favors short ones, so a wider beam can still pick the truncated can'
    },
    {
      'stem': 'This length-normalization helper is meant to make longer and shorter beam hypotheses comparable, but a teammate reports it still favors short outputs almost every time. Find the bug.',
      'choices': [
        'The exponent alpha should be applied to cum_prob , not to length .',
        'The function normalizes a raw probability rather than a log-probability, so the division doesn\'t correct the actual bias, which lives in summed log terms.',
        'alpha should default to 1.5 instead of 0.7.',
        'The function is correct; the bug must be in the beam expansion step instead.'
      ],
      'correct': 1,
      'explain': 'Length normalization is designed to counteract the bias created by summing negative log-probabilities across tokens. If cum_prob here is actually a raw probability (or a product of probabilities) rather than a sum of log-probabilities, dividing it by length ** alpha doesn\'t correct the length bias the way the technique assumes — raw probabilities already shrink multiplicatively toward zero with length in a way this d'
    },
    {
      'stem': 'A team needs to automatically score Swahili translations of incident reports and has only one human reference translation per source sentence. Which metric is the most defensible choice, and why?',
      'choices': [
        'BLEU, because it\'s the most widely reported metric in the literature.',
        'chrF, because character n-gram overlap degrades gracefully under the morphological variation that breaks word-level exact matching.',
        'ROUGE, because it\'s recall-oriented and Swahili sentences are often long.',
        'Raw exact-match accuracy, because it\'s simplest to implement.'
      ],
      'correct': 1,
      'explain': 'Swahili\'s agreement prefixes mean a correct translation can take multiple valid morphological forms that share almost no exact word n-grams with any single fixed reference. chrF\'s character-level n-grams are far more tolerant of this variation — a slightly different prefix still shares most characters with the reference form — so chrF stays informative where BLEU would swing wildly based on which single morphological'
    },
    {
      'stem': 'An abstractive summarizer produces: "Approximately 40 people were displaced after the flooding in the region." It reads fluently, is on-topic, and scores well on ROUGE-1 against the reference summary. The catch: no source report specified a number of displaced people at all. Which statement best explains why ROUGE failed to catch this?',
      'choices': [
        'ROUGE-1 only checks 4-grams, so a one-word insertion like "40" is invisible to it by design.',
        'ROUGE measures whether reference words appear in the hypothesis (recall); it has no mechanism for penalizing extra, unsupported content the hypothesis adds beyo',
        'ROUGE was designed for translation, not summarization, so it isn\'t applicable to this case at all.',
        'The summarizer must have used a larger beam width, which is what caused the hallucination.'
      ],
      'correct': 1,
      'explain': 'ROUGE\'s recall orientation means it checks how much of the reference\'s content shows up in the hypothesis — it never checks the reverse direction, whether everything in the hypothesis is actually supported by the reference or the source. An invented number sitting alongside otherwise-accurate, reference-matching content doesn\'t reduce the recall score at all, because recall only counts what\'s missing, never what\'s ad'
    },
    {
      'stem': 'A team building a Rohingya-English translation system has very little parallel data, so they back-translate a large body of monolingual English incident reports into synthetic Rohingya using a reverse (English-to-Rohingya) model — but that reverse model itself was trained on almost no data and is quite weak. What is the most likely outcom',
      'choices': [
        'The forward model improves roughly as much as it would with an equal amount of genuine parallel data, since the English side is real.',
        'The forward model learns to reproduce the weak reverse model\'s systematic errors as if they were valid Rohingya, because it has no way to distinguish synthetic ',
        'Back-translation has no effect either way, since only the reverse model\'s quality matters, not the forward model\'s.',
        'The forward model will automatically detect and discard the lowest-quality synthetic pairs during training.'
      ],
      'correct': 1,
      'explain': 'Back-translation\'s genuine target side (real English) is a real benefit only if the synthetic source side is a reasonably faithful rendering. When the reverse model is weak, its systematic mistakes — wrong morphology, wrong word choice patterns — appear consistently across the whole synthetic corpus, and the forward model has no signal telling it "this source sentence is synthetic and flawed"; it just trains on it li'
    },
    {
      'stem': 'This hierarchical summarization pipeline chunks a long incident-report feed and looks correct on a quick read: it chunks, summarizes each chunk, then summarizes the chunk-summaries. It passes on a five-sentence test report. Complete the missing piece so it also holds up on a fifty-sentence feed where a critical detail (a specific missing-',
      'choices': [
        'step = max_per_chunk - overlap — so consecutive chunks share overlap sentences instead of starting immediately after the previous chunk ends.',
        'step = max_per_chunk + overlap — so chunks are spaced further apart to cover the document faster.',
        'No change needed; the loop already produces overlapping chunks because range() handles it automatically.',
        'step = max_per_chunk // 2 , hard-coded, regardless of the overlap parameter.'
      ],
      'correct': 0,
      'explain': 'With step = max_per_chunk , chunks are back-to-back with zero overlap, so a sentence sitting exactly at a chunk boundary is fully contained in only one chunk — that\'s fine on its own, but it means each chunk\'s summarizer sees that boundary sentence with no surrounding context from the neighboring chunk, and a heuristic or model-based summarizer that ranks sentences by local salience can easily rank an isolated bounda'
    }
  ],
  'course-3-text-processing/unit8': [
    {
      'stem': 'A review reads: "Support was rude, but they refunded me the same day." A document-level sentiment classifier labels this "neutral." What is the most accurate diagnosis of the problem?',
      'choices': [
        'The classifier\'s training data was too small.',
        'Averaging two contradictory clause-level sentiments into one label discards actionable information about which specific aspects (support manner vs. refund proce',
        'The word "neutral" should never appear in a sentiment model\'s output space.',
        'The sentence needs to be translated before classification.'
      ],
      'correct': 1,
      'explain': 'This is the core ABSA motivation: document-level labels can be technically defensible (the clauses do roughly cancel) while being operationally useless, because they hide which aspect is the problem. A product team can\'t fix "neutral." A (training data size) is a plausible-sounding but wrong diagnosis — the issue isn\'t model capacity, it\'s that the label space itself (one scalar per document) can\'t represent two inde'
    },
    {
      'stem': '"The camera used to be great but this update ruined it" is hard for a sentiment model because the positive word ("great") and negative word ("ruined") both attach to the same aspect, and only context resolves which one describes the *current* state versus the past.',
      'choices': [
        'tense/temporal',
        'syntactic',
        'phonetic',
        'positional'
      ],
      'correct': 0,
      'explain': '"Used to be" signals past state, "ruined it" signals a change to the present state — resolving this needs the model to track that the sentence describes a state transition, not two coexisting facts. This is a variant of the comparative-sentiment problem: sentiment relative to a reference point (here, a *time* reference rather than another product). Phonetic context is irrelevant to text. Positional context (word orde'
    },
    {
      'stem': 'Which historical conversational-system lineage does a modern bank IVR menu ("say \'balance\' or \'transfer\'") most directly descend from?',
      'choices': [
        'ELIZA\'s pattern-matching reflection',
        'Retrieval-based open-domain chat',
        'Task-oriented systems (intent + slot filling + fixed backend actions)',
        'Pure LLM generation'
      ],
      'correct': 2,
      'explain': 'An IVR menu maps a limited set of recognized utterances to a fixed set of backend actions with required arguments (account number, transfer amount) — exactly the intent-classification-plus-slot-filling structure, just with a much more constrained recognition surface (menu options) than a modern NLU-based system. ELIZA reflected input back as questions with no backend action at all, which is the opposite of an IVR\'s j'
    },
    {
      'stem': 'This dialogue-state update is called on every turn of a multi-turn support conversation. A tester reports: "I told it my order number in turn 1, then in turn 3 I said \'actually make it express shipping\' and it forgot my order number entirely." Find the bug.',
      'choices': [
        'classify_intent is being called before fill_slots .',
        'state = new_slots overwrites the entire dialogue state with only the current turn\'s slots instead of merging, so any slot not mentioned in the current utterance',
        'The function is missing a call to a sentiment classifier.',
        'utterance should be lowercased before parsing.'
      ],
      'correct': 1,
      'explain': 'Dialogue state has to accumulate across turns — the fix is state = {**state, **new_slots} , merging new slots into the existing frame so slots filled earlier persist unless explicitly overwritten. This is precisely the "as I already told you" failure named in Lesson 2: losing accumulated state is the most common source of multi-turn frustration. The order of intent classification vs. slot filling (A) doesn\'t matter h'
    },
    {
      'stem': 'A support assistant is asked "what\'s the current firmware version for the X200?" The assistant, running as pure parametric generation with no retrieval, answers confidently with a version number that was correct eight months ago but is now two releases out of date. What is the most precise explanation for this failure?',
      'choices': [
        'The model wasn\'t fine-tuned on enough firmware-related examples.',
        'The model\'s parameters encode a frozen snapshot of its training data, so facts that changed after training (or were never in it) can\'t be reflected without exte',
        'The temperature setting was too high during generation.',
        'The tokenizer failed to recognize "X200" as a product name.'
      ],
      'correct': 1,
      'explain': 'This is the structural argument from Lesson 2: no amount of fine-tuning quality fixes a fact that postdates the training cutoff, because the model has no mechanism to know time has passed. Only retrieval (Lesson 3) or re-training closes that gap, and re-training is far more expensive than re-indexing a document. More fine-tuning examples (A) would help the model phrase firmware-version answers more fluently but can\'t'
    },
    {
      'stem': 'A customer asks "can I get money back if the thing I bought is broken" and a keyword-only BM25 retriever fails to surface the policy document phrased "defective units are eligible for a refund," because there\'s almost no lexical overlap between the query and the document. This is exactly the gap that retrieval closes, by matching on meani',
      'choices': [
        'dense (embedding-based)',
        'inverted-index',
        'alphabetical',
        'rule-based'
      ],
      'correct': 0,
      'explain': 'Sentence embeddings place "money back" and "refund," or "broken" and "defective," near each other in vector space even with zero shared vocabulary, which is exactly what BM25\'s term-overlap scoring cannot do. This is why production RAG systems typically hybridize BM25 with dense retrieval rather than picking one. "Inverted-index" (B) names BM25\'s underlying data structure, not a fix for its blind spot — it\'s the mech'
    },
    {
      'stem': 'Combining ideas from Lesson 2 and Lesson 3: a company builds a support assistant with an intent classifier, slot filling, and dialogue state tracking, and connects its "answer a factual question" intent to a RAG pipeline over the product docs. During evaluation, the assistant correctly classifies intent and fills slots on every turn, retr',
      'choices': [
        'The intent classifier is broken and needs retraining.',
        'Retrieval is finding the right documents nearly every time, and slots/intent are being extracted correctly, so the gap is most likely downstream — the generator',
        'The vector index needs to be rebuilt with more chunks.',
        'BM25 should be removed from the hybrid retriever since dense retrieval is doing all the work.'
      ],
      'correct': 1,
      'explain': 'This question chains Lesson 2\'s turn-level-vs-task-success distinction with Lesson 3\'s retrieval-recall-vs-faithfulness distinction. High intent/slot accuracy rules out the dialogue-parsing stage; high recall@5 rules out retrieval as the bottleneck. What\'s left is exactly the gap those metrics are designed to expose: the generator may be ignoring good context, producing unfaithful answers, or losing task-relevant sta'
    }
  ],
  'course-4-computer-vision/unit1': [
    {
      'stem': 'A Sentinel-2 tile is stored as a NumPy array with shape (512, 512, 13) . What does this ordering tell you?',
      'choices': [
        'It\'s channel-first (CHW), the default PyTorch expects.',
        'It\'s channel-last (HWC): 512 rows, 512 columns, 13 bands per pixel.',
        'It has 512 bands and only 13 spatial pixels.',
        'The shape doesn\'t indicate ordering; that\'s set by the file format alone.'
      ],
      'correct': 1,
      'explain': 'With height and width equal (512, 512) and a distinct trailing value (13) that matches Sentinel-2\'s known band count, the channel axis is last — HWC, the common convention for image libraries and raw satellite products. A is wrong because CHW would put 13 first, i.e. (13, 512, 512) — the opposite of what\'s shown. The array\'s axis order is a real property of how it was constructed, not something fixed by the file form'
    },
    {
      'stem': 'NDVI is computed as (NIR − Red) / (NIR + Red). A field of dense, healthy crops will show a NDVI value that trends toward because healthy chlorophyll strongly scatters NIR while absorbing red light for photosynthesis.',
      'choices': [
        '−1',
        '0',
        '+1',
        'It\'s undefined for vegetation'
      ],
      'correct': 2,
      'explain': 'Healthy vegetation reflects far more NIR than red, so the numerator (NIR − Red) is large and positive relative to the denominator, pushing the ratio toward its upper bound of +1. 0 (option B) is closer to what bare soil or built-up surfaces produce, where red and NIR reflectance are more similar; −1 (option A) would require NIR to be much lower than red, which happens for surfaces like clear water, not vegetation. Th'
    },
    {
      'stem': 'Which color space is the best fit for isolating cloud-like pixels by their washed-out, low-saturation appearance, independent of how bright the underlying terrain is?',
      'choices': [
        'RGB, thresholding on the blue channel alone',
        'HSV, thresholding on low saturation and high value',
        'Lab, thresholding on the a* axis',
        'The raw 13-band stack with no conversion needed'
      ],
      'correct': 1,
      'explain': 'HSV separates saturation (how vivid/washed-out a pixel is) from brightness, so clouds — bright and low-saturation — can be picked out with a rule that isn\'t confused by how bright the ground itself is in RGB. RGB (A) tangles brightness and color together in every channel, so a brightness-only rule also flags bright sand and glint. Lab\'s a*/b* axes (C) describe perceptual color position, not the saturation/washed-out '
    },
    {
      'stem': 'This function is meant to preprocess satellite tiles without normalisation leakage, but it has a bug. Identify the problem.',
      'choices': [
        'The mean/std are computed over all axes at once instead of per-channel.',
        'The mean and std are computed from all_tiles before the train/test split, leaking test statistics into training normalisation.',
        'The split should happen before the tiles are stacked into an array.',
        'Standard deviation should never be added with a small epsilon.'
      ],
      'correct': 1,
      'explain': 'mean and std are computed from stacked , which includes every tile before the split — so the test set\'s own pixel statistics have already influenced the numbers used to normalise the training set. The fix: call train_test_split first, then compute mean / std only from train_tiles , and apply those same frozen values to both splits. axis=(0,1,2) is actually correct here — it collapses the tile-index, height, and width'
    },
    {
      'stem': 'Complete the missing line so that extract_patches yields overlapping 256×256 patches with a 32-pixel overlap between neighbors, matching the tiling approach from Lesson 3.',
      'choices': [
        'stride = patch + overlap',
        'stride = patch // overlap',
        'stride = patch - overlap',
        'stride = overlap'
      ],
      'correct': 2,
      'explain': 'Advancing the window by patch − overlap pixels each step means each new patch shares exactly overlap pixels with the previous one — a 256-pixel patch with 32-pixel overlap advances by 224 pixels per step, so patches at positions 0 and 224 share columns/rows 224–255. patch + overlap (A) would skip ground entirely, leaving gaps rather than overlaps. overlap alone (D) makes the stride far too small, producing enormous r'
    }
  ],
  'course-4-computer-vision/unit2': [
    {
      'stem': 'Why is a Gaussian kernel generally preferred over a box kernel for smoothing an inspection image before edge detection?',
      'choices': [
        'The Gaussian kernel is not separable, so it captures diagonal structure the box filter misses.',
        'The Gaussian\'s smooth falloff avoids the ringing/false-edge artifacts a box filter\'s hard cutoff can introduce, while still being separable for speed.',
        'The box filter cannot be implemented as a convolution, only the Gaussian can.',
        'The Gaussian kernel always uses fewer multiply-adds than a box kernel of the same size.'
      ],
      'correct': 1,
      'explain': 'The Gaussian\'s bell-curve weighting has no hard spatial cutoff, so its frequency response lacks the ringing (false edges) a box filter\'s rectangular window produces, and it remains separable into two 1-D passes for the same speed benefit as a box filter. A is wrong on two counts: the Gaussian is separable, and separability is precisely why it\'s fast, not a downside. D is wrong — a box and Gaussian kernel of the same '
    },
    {
      'stem': 'Hysteresis thresholding in Canny uses two thresholds instead of one primarily to:',
      'choices': [
        'Speed up the computation by skipping the gradient magnitude step for weak pixels.',
        'Detect corners in addition to edges within the same pass.',
        'Keep weak-but-connected edge segments that dip below a single hard cutoff in places, while still discarding isolated weak responses like noise.',
        'Replace the need for a prior Gaussian smoothing step.'
      ],
      'correct': 2,
      'explain': 'A real edge can have a locally weak segment — a shadow crossing it, for instance — that would be lost under one hard threshold. By keeping any weak pixel that connects to a confirmed strong edge, hysteresis preserves that continuity while still dropping isolated weak-only responses, which are more likely noise. D is a common misread: hysteresis thresholding is entirely separate from, and comes after, the Gaussian smo'
    },
    {
      'stem': 'The Harris corner response R = det(M) − k·trace(M)² is large and positive at a corner because:',
      'choices': [
        'Both eigenvalues of the local structure tensor M are large, meaning the windowed intensity changes significantly in every direction, not just one.',
        'The gradient magnitude is zero in a flat region, which maximizes det(M).',
        'Corners always have a higher raw pixel brightness than edges or flat regions.',
        'The trace of M is always negative at corners, driving R positive.'
      ],
      'correct': 0,
      'explain': 'M\'s two eigenvalues describe how much windowed intensity varies along the two principal directions; a corner is exactly the case where both are large, giving a large determinant relative to the squared trace, so R is large and positive. D is wrong because trace(M) is a sum of squared gradient terms and is always non-negative by construction — it\'s never negative, at a corner or anywhere else.'
    },
    {
      'stem': 'A teammate\'s non-max suppression only ever checks the pixel\'s left and right neighbors, regardless of gradient orientation:',
      'choices': [
        'It has no visible effect — Canny edges look the same regardless of orientation handling.',
        'It only thins vertical edges correctly; horizontal and diagonal edges (e.g. horizontal scratches, angled solder bridges) stay several pixels wide because the wr',
        'It causes every pixel in the image to be suppressed to zero.',
        'It makes the algorithm run non-deterministically.'
      ],
      'correct': 1,
      'explain': 'Non-max suppression must compare each pixel against the two neighbors that straddle it perpendicular to the local gradient orientation. Always checking left/right only correctly thins edges whose gradient runs horizontally — and a horizontal gradient means a vertical edge, so vertical scratches are the one case the buggy version handles right. A horizontal scratch\'s gradient points up-down, so its edge, running left-'
    },
    {
      'stem': 'Why is ORB typically chosen over SIFT for a fixed-mount PCB inspection rig that needs to align a captured board to a reference layout at full camera frame rate on a CPU?',
      'choices': [
        'ORB is more scale-invariant than SIFT, which matters more than speed for a fixed camera distance.',
        'ORB\'s binary descriptor and Hamming-distance matching are far cheaper to compute and compare than SIFT\'s float descriptors and Euclidean distance, at a small co',
        'SIFT cannot be computed on grayscale images, only ORB can.',
        'ORB does not require any keypoint detection step, unlike SIFT.'
      ],
      'correct': 1,
      'explain': 'ORB\'s BRIEF-based binary descriptors compare against each other with XOR and a bit count instead of a full floating-point Euclidean distance, and are built from cheap FAST keypoints — a large speed advantage that matters when a rig has no GPU and a hard frame-rate budget, at some cost in the descriptor\'s discriminative power versus SIFT\'s richer 128-d histogram. A is backwards for the scenario described — a fixed cam'
    }
  ],
  'course-4-computer-vision/unit3': [
    {
      'stem': 'A team trains a 60-layer plain (no skip connections) CNN on camera-trap frames and finds its training accuracy is worse than a 20-layer version of the same design. Gradient magnitudes at the early layers look healthy, not vanished. What\'s the best explanation?',
      'choices': [
        'The 60-layer network is overfitting to the training set.',
        'The degradation problem: SGD is struggling to find a good solution (even an identity-like one) through that many stacked nonlinear layers, independent of gradie',
        'The learning rate is too high for a network this deep.',
        'The dataset is too small for any network deeper than 20 layers.'
      ],
      'correct': 1,
      'explain': 'Worse training error (not just validation error) rules out overfitting outright — an overfit model fits the training set well, it generalizes poorly. Since gradients aren\'t vanishing, the failure is optimization difficulty: deeper plain stacks make it harder for SGD to reach a good solution, which is precisely the degradation problem ResNet\'s residual connections address. A is the tempting distractor because "big net'
    },
    {
      'stem': 'A camera-trap classifier backbone applies a single standard 2D convolution to a 56×56 feature map with 64 input channels, producing 128 output channels, using a 3×3 kernel, stride 1, with padding that preserves spatial size. How many learnable weight parameters does this one convolution layer have (ignore bias)?',
      'choices': [
        '18,432',
        '36,864',
        '73,728',
        '294,912'
      ],
      'correct': 2,
      'explain': 'params = 3 × 3 × 64 × 128 = 9 × 64 × 128 = 9 × 8,192 = 73,728. Output spatial size stays 56×56 because padding=1 with a 3×3 kernel and stride 1 preserves resolution, but spatial size doesn\'t enter the parameter count at all — parameter count depends only on kernel size and channel counts, never on the feature map\'s height or width. 18,432 (A) is what you\'d get from 3×3×32×64 — half the channels in both directions, a '
    },
    {
      'stem': 'A colleague\'s augmentation pipeline for training a camera-trap species classifier is hurting validation accuracy compared to a no-augmentation baseline. Find the line causing the regression and explain the fix.',
      'choices': [
        'RandomResizedCrop \'s scale range is the problem — it should start much lower.',
        'RandomVerticalFlip(p=0.5) is the problem — it should be removed.',
        'RandomHorizontalFlip(p=0.5) is the problem — it should be removed.',
        'ColorJitter is the problem — brightness and contrast jitter should never be used on natural images.'
      ],
      'correct': 1,
      'explain': 'RandomVerticalFlip trains the model on upside-down animals, which never occur in real deployment — gravity orients wildlife in every genuine frame. This teaches the network a physically impossible prior and wastes training signal on images with no real-world analogue, which is consistent with a validation-accuracy regression. The fix is to drop that line entirely; horizontal flip, crop, and color jitter are all fine '
    },
    {
      'stem': 'A conservation group needs the species classifier to run entirely on the low-power chip inside each camera trap, with no cloud connection available in the field. Which architectural choice most directly reduces the model\'s FLOPs for a given accuracy level?',
      'choices': [
        'Replacing standard 3×3 convolutions with depthwise-separable convolutions.',
        'Adding more residual blocks to increase depth.',
        'Switching from batch normalization to layer normalization.',
        'Increasing the input image resolution from 224×224 to 384×384.'
      ],
      'correct': 0,
      'explain': 'Depthwise-separable convolutions split spatial filtering and channel mixing into two cheaper operations, cutting parameters and FLOPs by roughly 8-9x for typical 3×3, wide-channel layers with comparable accuracy — exactly the MobileNet trade this lesson\'s arithmetic worked through. This is a direct reduction in compute per layer, independent of any other change. D is the tempting distractor because higher resolution '
    },
    {
      'stem': 'A team fine-tunes an ImageNet-pretrained ResNet-50 on 40 images of a rare, nocturnal species by training every layer from the start at a normal learning rate, alongside far more images of common species. Accuracy on the rare species barely rises above random guessing. Which single change is most likely to help most?',
      'choices': [
        'Freeze early convolutional layers, fine-tune only later layers and the head at a low learning rate, and add class weighting or focal loss for the rare species.',
        'Switch the backbone from ResNet-50 to a plain (non-residual) network of the same depth.',
        'Remove batch normalization from the backbone since the rare species has too little data to estimate batch statistics reliably.',
        'Apply mixup aggressively between the rare species and the most common species to synthetically multiply the rare class\'s example count.'
      ],
      'correct': 0,
      'explain': 'Fine-tuning every layer at a normal learning rate on a dataset this imbalanced lets the abundant common-species gradient dominate updates everywhere, including early layers that didn\'t need to change; freezing early general-purpose features and adapting only later layers, combined with weighting the loss so the 40 rare-species images aren\'t drowned out, targets both real problems (limited data, extreme imbalance) dir'
    }
  ],
  'course-4-computer-vision/unit4': [
    {
      'stem': 'A detector scores three overlapping boxes on the same nearby vehicle: Box A (confidence 0.95), Box B (confidence 0.88, IoU with A = 0.72), Box C (confidence 0.60, IoU with A = 0.35, IoU with B = 0.55). Running greedy NMS with an IoU threshold of 0.5, which boxes survive?',
      'choices': [
        'Only A',
        'A and B',
        'A and C',
        'A, B, and C'
      ],
      'correct': 2,
      'explain': 'A and C. NMS picks the top-scoring box A first and removes any remaining box whose IoU with A exceeds 0.5 — that\'s B (0.72 > 0.5), so B is discarded before C is ever compared to it. C\'s IoU with A is only 0.35, under threshold, so C survives and becomes the next kept box. Option D is wrong because it ignores that B gets suppressed by A in the very first step; C\'s IoU with B (0.55) is irrelevant to that decision becau'
    },
    {
      'stem': 'Your perception team is choosing a detector for the primary 30+ FPS front-camera pipeline versus an offline tool for re-labeling a logged dataset with high-quality boxes for small, occluded objects. Which pairing makes sense?',
      'choices': [
        'Faster R-CNN for the real-time path, YOLO for offline re-labeling',
        'YOLO (or another one-stage detector) for the real-time path, Faster R-CNN for offline re-labeling',
        'Selective search alone for both, since it\'s simplest',
        'DETR for the real-time path, since transformers are always the modern choice'
      ],
      'correct': 1,
      'explain': 'One-stage detectors trade some accuracy for the speed the 30+ FPS real-time budget demands; two-stage detectors like Faster R-CNN spend more latency but tend to do better on small and occluded objects, which is exactly what you want for careful offline dataset curation where latency doesn\'t matter. Option A has the pairing backwards — it would put the slower, more accurate detector where speed is the hard constraint.'
    },
    {
      'stem': 'In Faster R-CNN, the component that replaced selective search by directly predicting object proposals from the shared backbone feature map is called the .',
      'choices': [
        'RoI pooling layer',
        'Region Proposal Network (RPN)',
        'Focal loss head',
        'Feature pyramid'
      ],
      'correct': 1,
      'explain': 'Region Proposal Network (RPN). The RPN slides over the shared feature map using anchors to predict objectness and rough box coordinates directly, replacing the CPU-bound external selective-search algorithm and making the whole detector end-to-end trainable. RoI pooling (option A) is a downstream step that extracts a fixed-size feature slice for each proposal — it doesn\'t generate the proposals themselves. Focal loss '
    },
    {
      'stem': 'A junior engineer wrote this focal-loss-inspired weighting function to down-weight easy background anchors, but during training the model\'s loss on hard, misclassified pedestrian anchors barely moves while easy anchors dominate exactly as before. Find and describe the bug.',
      'choices': [
        'The exponent should be 1, not gamma',
        'The function should return (1 - p_t) ** gamma , not p_t ** gamma',
        'The function needs a log() call that\'s missing',
        'The bug is in how p_t is computed upstream, not in this function'
      ],
      'correct': 1,
      'explain': 'Focal loss\'s modulating factor is (1 - p_t)^γ , not p_t^γ — it needs to shrink toward zero as p_t grows toward 1 (an easy, confidently-correct example), and grow toward 1 as p_t shrinks (a hard, wrong example). The buggy version does the opposite: p_t ** gamma is large for easy examples (0.99² ≈ 0.98) and small for hard ones (0.2² = 0.04) — it amplifies exactly the easy background anchors focal loss is meant to silen'
    },
    {
      'stem': 'SSD attaches detection heads to multiple feature maps at different depths of the backbone rather than just one, as YOLOv1 originally did. What problem does this specifically address?',
      'choices': [
        'The class-imbalance problem between background and object anchors',
        'The rounding error in mapping proposal coordinates onto a feature map',
        'The huge scale range between nearby, large objects and distant, small ones',
        'The slow, CPU-bound external proposal generation step'
      ],
      'correct': 2,
      'explain': 'Early, high-resolution feature maps suit small objects (a distant sign); later, low-resolution feature maps with larger receptive fields suit large objects (a nearby truck). Predicting at only one scale forces an anchor-size compromise between these extremes; multi-scale heads give each object size a natural home. Option A describes what focal loss/RetinaNet addresses, not SSD\'s multi-scale heads specifically. Option'
    },
    {
      'stem': 'Complete the missing line in this RoI-Align-style coordinate mapping, which converts a proposal box from image pixels to feature-map coordinates given the backbone\'s stride, without rounding.',
      'choices': [
        'fx_min, fy_min, fx_max, fy_max = round(x_min/stride), round(y_min/stride), round(x_max/stride), round(y_max/stride)',
        'fx_min, fy_min, fx_max, fy_max = x_min/stride, y_min/stride, x_max/stride, y_max/stride',
        'fx_min, fy_min, fx_max, fy_max = x_min*stride, y_min*stride, x_max*stride, y_max*stride',
        'fx_min, fy_min, fx_max, fy_max = int(x_min/stride), int(y_min/stride), int(x_max/stride), int(y_max/stride)'
      ],
      'correct': 1,
      'explain': 'Converting image pixels to feature-map units means dividing by the stride, and RoI Align\'s entire point is to keep the result fractional (not rounded or truncated) so bilinear interpolation can sample at the exact non-integer location — critical for small objects where rounding could collapse a box to zero width or height. Options A and D both round or truncate to integers, which is exactly the older RoI-pooling beha'
    }
  ],
  'course-4-computer-vision/unit5': [
    {
      'stem': 'A standard ResNet classification backbone, run on a 512×512 CT slice, produces a final feature map of 16×16. Why is this a problem specifically for segmentation and not for whole-image classification?',
      'choices': [
        'The 16×16 map has too many channels for a segmentation head to process efficiently.',
        'Classification only needs one global label, so the resolution loss doesn\'t matter; segmentation needs a decision at every one of the original 512×512 locations,',
        'A 16×16 feature map cannot represent more than 256 distinct classes, which is insufficient for organ segmentation.',
        'ResNet backbones are incompatible with segmentation and must be replaced entirely with a different family of networks.'
      ],
      'correct': 1,
      'explain': 'Downsampling is a deliberate design choice for classification — it builds translation invariance and a compact global descriptor, which is all a single whole-image label needs. Segmentation needs to recover a full-resolution, pixel-accurate map, and the fine detail that pooling discarded (tumor edges, thin vessel walls) generally cannot be reconstructed from the compressed bottleneck alone, which is exactly why skip '
    },
    {
      'stem': 'Transposed convolution and bilinear-upsample-then-convolve both increase a feature map\'s spatial resolution, but only transposed convolution is prone to checkerboard artifacts, which is why bilinear-upsample-then-convolve is often preferred in segmentation decoders.',
      'choices': [
        'True',
        'False'
      ],
      'correct': 0,
      'explain': 'True. Transposed convolution spreads each input activation over an output region defined by its kernel and stride; when kernel size isn\'t evenly divisible by stride, overlapping contributions land unevenly across output pixels, producing the visible grid-like checkerboard pattern. Bilinear upsampling is a fixed, non-learned interpolation with no such uneven-overlap mechanism, so the artifact doesn\'t arise from that s'
    },
    {
      'stem': 'A predicted tumor mask and a ground-truth tumor mask are being compared. Predicted mask area |P| = 400 voxels, ground-truth area |G| = 500 voxels, and the overlap |P ∩ G| = 300 voxels. What is the Dice coefficient?',
      'choices': [
        '0.60',
        '0.67',
        '0.75',
        '0.50'
      ],
      'correct': 1,
      'explain': '0.67. Dice = 2·|P∩G| / (|P| + |G|) = 2·300 / (400 + 500) = 600 / 900 ≈ 0.667. The formula divides by the sum of the two mask areas, not their union — that\'s what distinguishes it from IoU. 0.75 is the tempting distractor computed as |P∩G|/|P| = 300/400 — that\'s precision, not Dice, and it ignores that the ground-truth mask is a different size than the prediction. 0.60 is |P∩G|/|G| = 300/500 — that\'s recall, making th'
    },
    {
      'stem': 'A radiotherapy planning team wants a segmentation model tuned so that it strongly prefers to avoid missing any part of a tumor (false negatives), even if that means slightly over-segmenting healthy tissue at the margin (more false positives). Which loss configuration best matches this goal?',
      'choices': [
        'Plain Dice loss, since it already balances precision and recall equally.',
        'Tversky loss with β (false-negative weight) set higher than α (false-positive weight).',
        'Tversky loss with α (false-positive weight) set higher than β (false-negative weight).',
        'Plain pixel-wise cross-entropy, since it treats every voxel identically regardless of class.'
      ],
      'correct': 1,
      'explain': 'Tversky loss\'s β term penalizes false negatives (|G − P|, ground truth not covered by the prediction); raising β relative to α makes the loss more costly whenever the model under-segments, pushing training toward higher recall — exactly the "don\'t miss any tumor tissue" preference described, at the acceptable cost of some extra false-positive margin. Distractor A is wrong because plain Dice (α = β = 0.5) is precisely'
    },
    {
      'stem': 'A model achieves a Dice score of 0.93 on a kidney segmentation task, so the Hausdorff distance metric is redundant and doesn\'t need to be reported alongside it.',
      'choices': [
        'True',
        'False'
      ],
      'correct': 1,
      'explain': 'False. Dice is a whole-region overlap measure averaged across the full mask volume; a large, mostly correct kidney segmentation can have one small but clinically important region — say, near a boundary adjacent to a tumor or vessel — that\'s badly wrong, and because that error is a small fraction of the kidney\'s total volume, it barely moves an overlap score like Dice. Hausdorff distance (or HD95) specifically measure'
    },
    {
      'stem': 'A CT slice shows two adjacent, touching enlarged lymph nodes that a radiologist needs individually measured for a treatment-response report. Which segmentation approach is required, and why does Mask R-CNN\'s RoIAlign matter for it?',
      'choices': [
        'Semantic segmentation is sufficient, since both nodes belong to the same "lymph node" class and don\'t need to be distinguished.',
        'Instance segmentation is required to separate the two touching nodes into individually measurable objects; RoIAlign matters because its bilinear-interpolated fe',
        'Instance segmentation is required, but RoIAlign is irrelevant to mask quality — it only affects bounding-box regression accuracy.',
        'Panoptic segmentation is strictly required, since any scene containing more than one object of the same class must be handled panoptically.'
      ],
      'correct': 1,
      'explain': 'Because the report needs each node\'s own individual measurement, a single merged "lymph node" region (what semantic segmentation alone would produce) loses exactly the information needed — it can\'t tell you there are two nodes, let alone measure them separately. Mask R-CNN\'s mask head predicts a mask per RoI, and RoIAlign\'s precise, non-rounded feature sampling is what keeps that per-RoI mask correctly aligned to the'
    }
  ],
  'course-4-computer-vision/unit6': [
    {
      'stem': 'A plain ViT-Base is fine-tuned on a boutique\'s catalogue of 8,000 product photos (no pretraining, trained from scratch) and underperforms a ResNet-50 trained from scratch on the same data. What is the most likely explanation?',
      'choices': [
        'ViT\'s [CLS] token cannot represent classification tasks as well as global average pooling.',
        'ViT has no convolutional inductive bias, so at this data scale it hasn\'t seen enough examples to learn locality and translation structure on its own, while the ',
        '16×16 patches are too large to capture fine product detail.',
        'Self-attention cannot express translation equivariance in principle, at any data scale.'
      ],
      'correct': 1,
      'explain': 'This is exactly the JFT-300M lesson from Lesson 1: at small data scale (8,000 images is far below even ImageNet-1k), a from-scratch ViT underperforms a CNN because it must learn spatial priors the CNN has built in. This is a data-scale effect, not a fundamental limitation. D is the tempting-sounding but wrong distractor: self-attention absolutely can express translation-equivariant behavior given enough data and appr'
    },
    {
      'stem': 'In ViT\'s patch embedding, a 224×224×3 image split into 16×16 patches produces patch tokens before the [CLS] token is prepended.',
      'choices': [
        '49',
        '196',
        '224',
        '768'
      ],
      'correct': 1,
      'explain': '224 / 16 = 14 patches per side, so 14 × 14 = 196 patches total. 768 is the tempting distractor because it\'s the patch embedding dimension (16×16×3 = 768 raw pixel values per patch, which the linear layer projects to d_model, often also 768) — a size that shows up in the same sentence but answers a different question than "how many tokens."'
    },
    {
      'stem': 'An engineer implements MAE-style pretraining for a catalogue-image encoder but sets the mask ratio to 15%, copying the value directly from a BERT config, reasoning "it\'s the same mask-and-reconstruct idea, so the same ratio should transfer." Training loss drops quickly and the model reconstructs images near-perfectly, but the encoder perf',
      'choices': [
        'The loss function is wrong; MAE should use cross-entropy, not MSE, on pixel values.',
        'The mask ratio is far too low for images; at 15% masking, most patches are trivially recoverable from unmasked neighbors by local interpolation, so the encoder ',
        'The decoder should be as large as the encoder, matching BERT\'s symmetric architecture.',
        'Nothing is wrong; low reconstruction loss confirms the encoder learned good representations.'
      ],
      'correct': 1,
      'explain': 'Images are spatially redundant in a way text isn\'t — a masked patch is usually predictable from its immediate unmasked neighbors. A 15% mask ratio, appropriate for BERT\'s information-dense text tokens, is far too easy for images and lets the model reconstruct via simple interpolation without learning global structure. MAE uses roughly 75% masking specifically to remove that shortcut. D is the trap: low reconstruction'
    },
    {
      'stem': 'A marketplace wants shoppers to type a text query like "quilted black shoulder bag with chain strap" and retrieve matching product photos. Which architecture directly enables this without any labeled category taxonomy?',
      'choices': [
        'A Swin Transformer classifier fine-tuned on a fixed set of product categories.',
        'A SimCLR-pretrained image encoder used alone.',
        'CLIP, whose contrastively-trained dual encoders place images and text in one shared embedding space, so a text query embeds into the same space as catalogue ima',
        'An MAE-pretrained encoder, since its decoder can generate text captions from images.'
      ],
      'correct': 2,
      'explain': 'Text-to-image retrieval requires text and images to live in one comparable embedding space — that\'s exactly what CLIP\'s image-text contrastive training produces, letting a text query\'s embedding be compared by cosine similarity against precomputed catalogue image embeddings. B is the tempting distractor: SimCLR produces a strong image-only embedding space (useful for image-to-image similarity), but it was never train'
    },
    {
      'stem': 'Complete the shifted-window helper so that a (H, W, C) grid of patch tokens is partitioned into non-overlapping local windows for windowed self-attention. Fill in the blank so the reshape correctly groups tokens by window rather than by row.',
      'choices': [
        'reshape(-1, C)',
        'transpose(0, 2, 1, 3, 4)',
        'flatten()',
        'transpose(1, 0, 3, 2, 4)'
      ],
      'correct': 1,
      'explain': 'After the initial reshape the axes are (window_row, in_window_row, window_col, in_window_col, C). To group all tokens belonging to the same window together before flattening, window_row and window_col need to be adjacent, so window_col (axis 2) must move next to window_row (axis 0) — giving (window_row, window_col, in_window_row, in_window_col, C), which is what transpose(0, 2, 1, 3, 4) produces. D swaps the wrong pa'
    },
    {
      'stem': 'A team benchmarks ConvNeXt against Swin Transformer on their product-category classification task, both trained with the same modern recipe (AdamW, strong augmentation, long schedule), and finds accuracy within 0.3% of each other. What is the best conclusion to draw?',
      'choices': [
        'The benchmark must be flawed, since transformers are architecturally superior to CNNs for vision.',
        'This matches the broader finding that a large share of ViT-family gains over older CNNs came from modernized training recipes rather than attention itself — onc',
        'ConvNeXt must be internally using self-attention, which is why it matches Swin.',
        'The result is only possible because the catalogue is unusually small; at scale Swin would pull ahead.'
      ],
      'correct': 1,
      'explain': 'This is exactly the ConvNeXt rebuttal from Lesson 2: it\'s a pure CNN with modernized training and design details, and it matches transformer backbones at comparable scale, showing recipe mattered more than the presence of attention. C is the tempting-but-wrong distractor: ConvNeXt is explicitly attention-free — its improvements come from things like larger depthwise kernels, GELU, fewer normalization layers, and an i'
    },
    {
      'stem': 'A CLIP-based zero-shot classifier, trained mostly on clean web-scraped studio-style product photos, is deployed to auto-tag photos that sellers upload from their phones. Accuracy is noticeably lower on the phone uploads than in the studio-photo benchmark that was used to select the model. Separately, the model also confuses "a tan bag wit',
      'choices': [
        'Both failures stem from the same root cause: too few training epochs.',
        'The accuracy drop on phone photos is distribution shift (studio-vs-user-photo gap); the color/attribute confusion is CLIP\'s separate bag-of-words weakness, wher',
        'Both are caused by the mask ratio being set too low during pretraining.',
        'Both would be fixed by switching from a ViT image encoder to a Swin image encoder inside CLIP.'
      ],
      'correct': 1,
      'explain': 'These are two independent, well-known CLIP limitations from Lesson 3: distribution shift (a model whose training skewed toward clean studio images degrades on cluttered, differently-lit user photos) and the bag-of-words weakness (contrastive training rewards overall gist-matching, not compositional/attribute-order structure). Diagnosing them as one root cause would send the team looking for a single fix that doesn\'t '
    }
  ],
  'course-4-computer-vision/unit7': [
    {
      'stem': 'A team training a GAN to generate synthetic weld-defect images notices that after epoch 40, every generated "porosity" defect looks almost pixel-identical — same size, same position, same shape. Discriminator and generator losses both look numerically stable. What is this, and what\'s the most direct fix?',
      'choices': [
        'Vanishing gradients; lower the discriminator\'s learning rate.',
        'Mode collapse; add a diversity-encouraging term (e.g. minibatch discrimination) or switch to a loss less prone to it, like WGAN-GP.',
        'Non-convergence; the losses oscillating means training hasn\'t started yet, so just train longer.',
        'Overfitting; add dropout to the generator.'
      ],
      'correct': 1,
      'explain': 'A generator collapsing to near-identical outputs while losses stay numerically stable is the textbook signature of mode collapse — the generator found a narrow trick that reliably fools the current discriminator and stopped exploring. WGAN-GP\'s smoother loss landscape and explicit diversity-encouraging techniques are the standard countermeasures. Vanishing gradients (A) present as the generator failing to improve at '
    },
    {
      'stem': 'A product team wants to swap a diffusion pipeline from DDPM sampling with 1,000 steps to DDIM sampling with 40 steps for a faster interactive preview. What should they expect?',
      'choices': [
        'Identical sample quality with a 25x speedup, since DDIM is mathematically equivalent to DDPM at any step count.',
        'A speedup, with quality close to (though not always exactly matching) the full-step DDPM result, because DDIM\'s non-Markovian reformulation permits skipping ste',
        'No speedup, because the U-Net still has to process the full image at every one of the 1,000 original noise levels regardless of sampler.',
        'A speedup only if they also switch to a GAN, since diffusion samplers cannot be accelerated below 1,000 steps.'
      ],
      'correct': 1,
      'explain': 'DDIM\'s reformulation of the reverse process as non-Markovian is precisely what allows it to skip intermediate steps while approximating the same trajectory, typically getting most of DDPM\'s quality in a fraction of the steps — but "approximating" is the operative word; it is not mathematically identical output. A overstates the guarantee — DDIM is an approximation, not an equivalence, and quality can degrade at very '
    },
    {
      'stem': 'A junior engineer wrote this classifier-free guidance step, but samples come out barely responsive to the prompt no matter how high they set w . Find the bug.',
      'choices': [
        'The guidance weight w should be a value less than 1, not greater.',
        'The unconditional pass is called with cond=cond_emb instead of cond=None , so eps_cond and eps_uncond are identical and the guidance term collapses to zero rega',
        'The two U-Net calls should share one forward pass to save compute.',
        'The extrapolation direction is reversed — it should be eps_cond - w*(eps_cond - eps_uncond) .'
      ],
      'correct': 1,
      'explain': 'Both lines call the U-Net with the identical conditioning embedding, so eps_cond - eps_uncond is exactly zero every time, no matter what w is — the model is silently only ever seeing eps_uncond (which happens to equal eps_cond here), which matches the reported symptom of prompt-blindness at any guidance strength. The unconditional call needs cond=None to actually train the divergence between the two predictions that '
    },
    {
      'stem': 'A hospital-imaging team generates synthetic X-rays of a rare fracture pattern with a fine-tuned diffusion model to augment a scarce real dataset. After adding the synthetic images, their held-out test accuracy (drawn from the same synthetic pipeline) jumps from 81% to 97%. What should this jump make them suspicious of?',
      'choices': [
        'Nothing — a 16-point jump confirms the augmentation worked and the classifier is ready to deploy.',
        'That the FID score of the generator must have been poor, since FID would have caught this.',
        'That the classifier may have learned to key off generator-specific artifacts shared between the synthetic training and synthetic test images, rather than the re',
        'That classifier-free guidance was set too low during generation.'
      ],
      'correct': 2,
      'explain': 'A large accuracy jump on a test set that itself contains synthetic images is exactly the domain-gap trap: the classifier can be rewarded for detecting shared generator fingerprints rather than the true physical signature, and this failure is invisible until validated against real images the generator never touched. A ignores the specific risk named in the lesson — a suspicious jump warrants scrutiny of the evaluation'
    },
    {
      'stem': 'Complete the missing line in this ControlNet-style sketch so the auxiliary structural signal (an edge map) actually influences the frozen base U-Net\'s output, per the mechanism described in Lesson 3.',
      'choices': [
        'base_features (ignore control_features entirely)',
        'base_features + control_features',
        'control_features (ignore base_features entirely)',
        'torch.cat([base_features, control_features], dim=0) (stack along the batch dimension)'
      ],
      'correct': 1,
      'explain': 'ControlNet\'s trainable branch is injected into the frozen base model\'s activations additively (the original paper zero-initializes the injection so it starts as a no-op and gradually learns useful contributions), so the base network\'s learned image priors and the auxiliary structural signal both influence the decoder. A discards the entire point of ControlNet — without adding control_features in, the edge map has no '
    }
  ],
  'course-4-computer-vision/unit8': [
    {
      'stem': 'A new store format launches with almost no labelled shelf images. Which backbone choice typically requires the fewest labelled examples to reach a given shelf-recognition accuracy?',
      'choices': [
        'A randomly initialized network trained from scratch on the new store\'s footage only',
        'An ImageNet-pretrained backbone, fully fine-tuned from the first day',
        'A self-supervised backbone pretrained on the company\'s own unlabelled retail images from other stores',
        'A backbone pretrained purely on synthetic renders of the product catalogue'
      ],
      'correct': 2,
      'explain': 'A self-supervised backbone pretrained on unlabelled images from the same domain (retail shelves, not natural photos) has already learned relevant features — packaging texture, occlusion, shelf clutter — before seeing a single label, cutting the labelled-data requirement roughly in half to a third compared to a generic ImageNet backbone. ImageNet pretraining (B) still helps over training from scratch, but its source d'
    },
    {
      'stem': 'Why must on-shelf product recognition run on edge hardware near the cameras rather than streaming all raw video to a central cloud region for inference?',
      'choices': [
        'Edge accelerators are always more accurate than cloud GPUs',
        'Cloud inference cannot run quantized models',
        'Bandwidth limits, round-trip latency, and minimizing raw video leaving the premises all favor local processing',
        'Cloud providers do not allow computer vision workloads'
      ],
      'correct': 2,
      'explain': 'Dozens of camera streams backhauled continuously would saturate a store\'s uplink; round-trip cloud latency (often 80-150ms each way) is too slow for near-instantaneous cart tracking; and shipping only derived events instead of raw video meaningfully shrinks the amount of sensitive footage moved off-premises. Edge hardware is not inherently more accurate (A) — it typically runs a compressed, slightly less accurate ver'
    },
    {
      'stem': 'A teammate quantizes the edge detector to INT8 and reports the model now runs faster but flags almost every product on a newly re-lit produce aisle as "unknown SKU," even though it worked fine before the aisle\'s lighting was changed. What is the most likely root cause, and what\'s the fix?',
      'choices': [
        'INT8 quantization is fundamentally incompatible with produce recognition',
        'The calibration data no longer matches current input statistics after the re-light, so INT8 scale/zero-point ranges are miscalibrated for the new lighting',
        'The model needs to be pruned instead of quantized',
        'The tracker\'s Kalman filter parameters need retuning'
      ],
      'correct': 1,
      'explain': 'Post-training INT8 quantization picks numeric ranges (scale and zero-point) from calibration data, and those ranges are only valid if calibration inputs match production inputs. Calibrating on old-lighting images while the aisle now has different color and brightness statistics means activations at inference time fall outside the ranges the quantization was tuned for, degrading accuracy sharply — this is the "store r'
    },
    {
      'stem': 'Combining Units 4 and 8. A shopper\'s hand is detected reaching for a shelf in frame 214 and again in frame 215, each with only 55-60% classifier confidence on which SKU was picked up. Which pipeline stage is specifically responsible for turning these two independent low-confidence detections into one higher-confidence event, rather than r',
      'choices': [
        'The Unit 4 object detector itself, by increasing its confidence threshold',
        'Re-identification across camera views',
        'Tracking, by linking detections across frames and letting confidence average over time',
        'The synthetic data generator'
      ],
      'correct': 2,
      'explain': 'Tracking links per-frame detections into a continuous trajectory across time, which is exactly what lets the system treat two weak same-object detections as reinforcing evidence for one identity rather than two separate uncertain guesses — cheaper than brute-forcing higher single-frame accuracy with a larger, slower detector (the point Lesson 2 makes about streaming video versus independent frames, applied to the Uni'
    },
    {
      'stem': 'Combining Course 3 and Course 4. Two SKUs are visually near-identical except for a small printed flavor name on the package, and the vision classifier keeps confusing them. Store staff also want to ask the system plain-language questions like "how many times was SKU 88213 picked up yesterday afternoon?" Which combination of techniques add',
      'choices': [
        'A larger convolutional backbone for the classifier, and a SQL dashboard for the queries',
        'OCR plus a lightweight text classifier to read the printed flavor name, and a RAG-style retrieval system over aggregated events for the natural-language query',
        'INT8 quantization for the classifier, and a Kalman filter for the queries',
        'Synthetic data augmentation for the classifier, and knowledge distillation for the queries'
      ],
      'correct': 1,
      'explain': 'Reading the printed text directly (OCR plus a small text classifier, drawing on Course 3\'s sequence-processing techniques) resolves a visual ambiguity that a pure vision classifier struggles with, since the packages are otherwise identical. A RAG-style pipeline (Course 3 Unit 8) — embedding the natural-language question, retrieving matching aggregated events, and having a language model compose a grounded answer — is'
    }
  ]
};

/**
 * Fisher-Yates over a copy. Answer order in the source curriculum is heavily
 * skewed — two thirds of its correct answers sit in slot B — so every set is
 * shuffled per attempt, choices and question order both, and `correct` is
 * remapped to wherever the right option landed.
 */
export function shuffleQuestion<T extends QuizQuestion>(q: T): T {
  const order = q.choices.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return {
    ...q,
    choices: order.map((i) => q.choices[i]),
    correct: order.indexOf(q.correct),
  } as T;
}

/**
 * Shuffle the options inside every question, but KEEP the question order: the
 * bank is deliberately ramped easy-first, and shuffling the sequence would put
 * a tensor-shape question first on a lesson someone just started.
 */
export function shuffleSet<T extends QuizQuestion>(questions: T[]): T[] {
  return questions.map((q) => shuffleQuestion(q) as T);
}

/** Questions for one lesson stage: a slice of the unit's pool. */
export function lessonQuestions(lessonId: string, lessonIndex: number): QuizQuestion[] {
  const pool = quizzes[lessonId] ?? [];
  if (pool.length === 0) return [];
  const per = Math.max(2, Math.floor(pool.length / 3));
  const start = (lessonIndex - 1) * per;
  const picked = pool.slice(start, start + Math.min(per, 3));
  return picked.length > 0 ? picked : pool.slice(0, 2);
}

/** The full pool, for the boss battle. */
export function bossQuestions(lessonId: string): QuizQuestion[] {
  return quizzes[lessonId] ?? [];
}
