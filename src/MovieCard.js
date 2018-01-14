import React from 'react';
import { Plus, Minus, XSymbol, View, Star } from './Icons'

export default ({ title, image }) => 
<div className="movie-card" style={{backgroundImage: `url(${image})`}}>
    <div className="sidebar">
      <div className="sidebar-icons">
        <Plus />
        <View />
        <XSymbol />
        
      </div>
    </div>
</div>;