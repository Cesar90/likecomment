jQuery(function ($) {
  function getInitalData() {
    var allComments = '/api/comments'
    var randonUser = '/api/users/current'

    var allCommentsRequest = axios.get(allComments)
    var randonUserRequest = axios.get(randonUser)

    axios
      .all([allCommentsRequest, randonUserRequest])
      .then(
        axios.spread((...responses) => {
          var commentInfo = responses[0]
          var userInfo = responses[1]

          renderUser(userInfo.data)
          renderComments(commentInfo.data)
        })
      )
      .catch((errors) => {
        console.error(errors)
      })
  }

  function upvoteAction(commentId) {
    var upvoteUrl = '/api/comments/upvote'
    return axios({
      method: 'post',
      url: upvoteUrl,
      data: {
        commentId: commentId,
      },
    })
  }

  function createComment(comment) {
    var createCommentUrl = '/api/comments'
    return axios({
      method: 'post',
      url: createCommentUrl,
      data: comment,
    })
  }

  function renderUser(user) {
    jQuery('.currentUserAvatar').attr('src', user.fakeUser.avatar)
    jQuery('#userId').val(user.fakeUser._id)
  }

  function renderComments(comments) {
    var stringToRender = ''
    comments.comments.forEach(function (comment) {
      stringToRender +=
        '<div class="flex space-x-2">' +
        '<img src="' +
        comment.fakeUser.avatar +
        '" alt="Profile ' +
        'picture" class="w-9 h-9 rounded-full">' +
        '<div> ' +
        '<div class=" p-2 rounded-2xl text-sm">' +
        '<div class="flex">' +
        '<span class="font-semibold block">John Doe</span>' +
        '<span class="pl-1 pr-1">∙</span>' +
        dateFns.distanceInWordsToNow(comment.updatedAt) +
        ' ago ' +
        '</div>' +
        '<span>' +
        comment.comment +
        '</span>' +
        '</div>' +
        '<div class="p-2 text-xs text-gray-500 dark:text-dark-txt">' +
        '<span class="font-semibold cursor-pointer upvoteAction" data-id="' +
        comment._id +
        '">Upvote<span id=commentUpvote_' +
        comment._id +
        '>' +
        comment.upvote +
        '</span></span>' +
        '<span>. </span>' +
        '<span class="font-semibold cursor-pointer">Reply</span>' +
        '</div>' +
        '</div>' +
        '</div>'
    })

    jQuery('#renderAllComments').html(stringToRender)
  }

  jQuery(document).ready(function () {
    getInitalData()
    $(document).on('click', '#renderAllComments .upvoteAction', function (e) {
      e.stopPropagation()
      e.preventDefault()
      var commentId = $(this).data('id')
      upvoteAction(commentId).then(function (response) {
        $('#commentUpvote_' + commentId).html(response.data.upvote)
      })
    })
    $('#submitBtn').on('click', function (e) {
      e.preventDefault()
      var values = {}
      $.each($('#myform').serializeArray(), function (i, field) {
        values[field.name] = field.value
      })
      createComment(values).then(function (response) {
        var stringToRender =
          '<div class="flex space-x-2">' +
          '<img src="' +
          response.data.fakeUser.avatar +
          '" alt="Profile picture" class="w-9 h-9 rounded-full">' +
          '<div>' +
          '<div class=" p-2 rounded-2xl text-sm">' +
          '<div class="flex">' +
          '<span class="font-semibold block">John Doe</span>' +
          '<span class="pl-1 pr-1">∙</span>' +
          response.data.updatedAt +
          '</div>' +
          '<span>' +
          response.data.comment +
          '</span>' +
          '</div>' +
          '<div class="p-2 text-xs text-gray-500 dark:text-dark-txt">' +
          '<span class="font-semibold cursor-pointer" data-id="' +
          response.data._id +
          '">Upvote<span id=commentUpvote_' +
          response.data._id +
          '>' +
          response.data.upvote +
          '</span></span>' +
          '<span>.</span>' +
          '<span class="font-semibold cursor-pointer">Reply</span>' +
          '</div>' +
          '</div>' +
          '</div>'

        jQuery('#renderAllComments').append(stringToRender)
      })
    })
  })
})
