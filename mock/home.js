function get_carousel(req, res, u, b) {
  res.json({
    code: 200,
    data: [
      {
        image_url: 'http://1.15.48.81:8888/down/INBZ016ZsL6e',
        f_span: 'Artificial Intelligence',
        s_span: 'For',
        t_span: 'Every One',
        button_title: 'Learn More',
        button_url: 'http://topsoftaiprophet.com',
        general_color: '#FFFFFF',
        hover_text_color: '#000000',
      },
      {
        image_url: 'http://1.15.48.81:8888/down/INBZ016ZsL6e',
        f_span: 'Artificial Intelligence',
        s_span: 'For',
        t_span: 'Every One',
        button_title: 'Learn More',
        button_url: 'http://topsoftaiprophet.com',
        general_color: '#FFFFFF',
        hover_text_color: '#000000',
      },
    ],
  });
}

export default {
  'GET /get_carousel': get_carousel,
};
